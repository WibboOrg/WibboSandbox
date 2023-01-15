<?php
class UploadFurniController extends BaseController
{
    public function post()
    {
        $user = $this->getAuthUser();

        if($user["rank"] < 13) throw new HttpException("Vous n'avez pas les permissions requis", 400);

        $uploadData = array();

        $fileNames = $_FILES["file"]["name"];
        for ($i = 0; $i < count($fileNames); $i++) {
            $file = $fileNames[$i];
            $fileTmp = $_FILES["file"]["tmp_name"][$i];

            if (!$file) {
                throw new HttpException("Fichier introuvable", 400);
            }

            if (!preg_match('/^[a-z0-9_]+\.nitro$/', $file)) {
                throw new HttpException('Nom du fichier ou extension incorrecte (.nitro)', 400);
            }

            $furniName = explode(".nitro", $file)[0];
        
            $furniTitle = $furniName . " title";
            $furniDesc = $furniName . " desc";

            $nbMin = 10000000;
            $nbMax = 99999999;
            $furniId = mt_rand($nbMin, $nbMax);
            $type = 's';

            if ($type !== 's' && $type !== 'i') {
                throw new HttpException('Type incorrect', 400);
            }

            if (ItemBaseDto::getOneByIdOrName($furniId, $furniName) !== null) {
                throw new HttpException('Mobilier déjà existant: '. $furniName, 400);
            }

            ItemBaseDto::create($furniId, $furniName, $type);
            CatalogItemDto::create($furniId, $furniName);

            $funidataCode = array(
                "id" => intval($furniId),
                "classname" => $furniName,
                "revision" => 0,
                "category" => "",
                "name" => utf8_decode($furniTitle),
                "description" => utf8_decode($furniDesc),
                "adurl" >= "",
                "offerid" => 0,
                "buyout" => false,
                "rentofferid" => 0,
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
                    "partcolors" => array(),
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

            $productCode = array();
            $productCode[0] = array('code' => $furniName, 'name' => $furniTitle, 'description' => $furniDesc);

            $product = array(
                "productdata" => array(
                    "product" => $productCode,
                ),
            );

            array_push($uploadData, 
                array(
                    'action' => 'json',
                    'path' => 'gamedata/FurnitureData.json',
                    'data' => json_encode($furnidata),
                ),
                array(
                    'action' => 'json',
                    'path' => 'gamedata/ProductData.json',
                    'data' => json_encode($product),
                ),
                array(
                    'action' => 'upload',
                    'path' => 'bundled/furniture/' . $file,
                    'data' => base64_encode(file_get_contents($fileTmp)),
                ),
            );
        }

        if (Helper::uploadApi('assets', $uploadData)) {
            throw new HttpException('Problème lors de l\'importation: ', 400);
        }
    }
}
