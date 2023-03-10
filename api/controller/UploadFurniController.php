<?php
class UploadFurniController extends BaseController
{
    public array $minRank = ['POST' => 11];
    
    public function post(Request $request)
    {
        $file = $request->getFile();
        $fileIcon = $request->getFile("fileIcon");
        $dataStr = $request->getString(["type", "name", "description"]);
        
        $uploadData = array();

        if ($file["base64"] === '') {
            throw new HttpException("Fichier introuvable", 400);
        }

        if (!preg_match('/^[A-Za-z0-9_]+\.nitro$/', $file["name"])) {
            throw new HttpException('Nom du fichier ou extension incorrecte (mon_fichier_123.nitro)', 400);
        }

        $furniName = explode(".nitro", $file["name"])[0];

        $furniTitle = !empty($dataStr["name"]) ? $dataStr["name"] : $furniName . " title";
        $furniDesc = !empty($dataStr["description"]) ? $dataStr["description"] : $furniName . " desc";
        $type = !empty($dataStr["type"]) ? $dataStr["type"] : 's';

        if ($type !== 's' && $type !== 'i') {
            throw new HttpException('Type incorrect', 400);
        }

        $furniId = ItemBaseDto::getLastId() + 1;

        if (ItemBaseDto::getOneByIdOrName($furniId, $furniName)) {
            throw new HttpException('Mobilier déjà existant', 400);
        }

        $funidataCode = array(
            "id" => intval($furniId),
            "classname" => $furniName,
            "revision" => 0,
            "category" => "",
            "name" => $furniTitle,
            "description" => $furniDesc,
            "adurl" >= "",
            "offerid" => 0,
            "buyout" => false,
            "rentofferid" => -1,
            "rentbuyout" => false,
            "customparams" => "",
            "specialtype" => 0,
            "bc" => false,
            "excludeddynamic" => false,
            "furniline" => "",
            "environment" => "",
            "rare" => false,
        );

        if ($type === 's') {
            $funidataCode = array_merge($funidataCode, array(
                "defaultdir" => "0",
                "xdim" => intval(0),
                "ydim" => intval(0),
                "partcolors" => ['color' => array()],
                "canstandon" => false,
                "cansiton" => false,
                "canlayon" => false,
            ));
        }

        if ($type === 's') {
            $furnidata["roomitemtypes"]["furnitype"][] = $funidataCode;
        } else {
            $furnidata["wallitemtypes"]["furnitype"][] = $funidataCode;
        }

        $product = array(
            "productdata" => array(
                "product" => array(array('code' => $furniName, 'name' => $furniTitle, 'description' => $furniDesc)),
            ),
        );

        if ($fileIcon["base64"] !== '') {
            array_push($uploadData,
                array(
                    'action' => 'upload',
                    'path' => 'icons/' . $furniName . '_icon.png',
                    'data' => $fileIcon["base64"],
                )
            );
        }

        array_push($uploadData,
            array(
                'action' => 'upload',
                'path' => 'bundled/furniture/' . $file["name"],
                'data' => $file["base64"],
            ),
            array(
                'action' => 'json',
                'path' => 'gamedata-sandbox/FurnitureData.json',
                'data' => json_encode($furnidata),
            ),
            array(
                'action' => 'json',
                'path' => 'gamedata-sandbox/ProductData.json',
                'data' => json_encode($product),
            ),
        );

        if (!Helper::uploadApi('assets', $uploadData)) {
            throw new HttpException('Problème lors de l\'importation', 400);
        }

        ItemBaseDto::create($furniId, $type, $furniName, 1, 1, 1, 0, 0, 0, 'default', 1, 0, '', 0);
        CatalogItemDto::create($furniId, 1546145145, $furniName, 3, 0, 0, 1, 1, '');

        LogSandboxDto::create($this->user['id'], 'post', 'furniture', $furniName);
    }
}
