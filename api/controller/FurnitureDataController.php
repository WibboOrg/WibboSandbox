<?php
set_time_limit(0);

class FurnitureDataController extends BaseController
{	
    public function patch(Request $request) 
    {
        $furniData = Helper::getSslPage("https://assets.wibbo.org/gamedata-sandbox/FurnitureData.json?cache=" . time(), true);

        $product["productdata"]["product"] = array();
        
        foreach ($furniData->roomitemtypes->furnitype as $var) {
            $this->furnidata($var, 's');
			
			$productCode = array('code' => $var->classname, 'name' => $var->name, 'description' => $var->description);
			$product["productdata"]["product"][] = $productCode;
        }

        foreach ($furniData->wallitemtypes->furnitype as $var) {
            $this->furnidata($var, 'i');
			
			$productCode = array('code' => $var->classname, 'name' => $var->name, 'description' => $var->description);
			$product["productdata"]["product"][] = $productCode;
        }
        
        $uploadData = array(
            array(
                'action' => 'upload',
                'path' => 'gamedata-sandbox/FurnitureData.json',
                'data' => base64_encode(json_encode($furniData)),
            ),
            array(
                'action' => 'upload',
                'path' => 'gamedata-sandbox/ProductData.json',
                'data' => base64_encode(json_encode($product)),
            )
        );

        if (!Helper::uploadApi('assets', $uploadData)) {
            throw new HttpException('Problème lors de l\'importation', 400);
        }

        LogSandboxDto::create($this->user['id'], 'patch', 'FurnitureData.json', '');
    }

    private function furnidata(Object $var, string $type)
    {
        $id = $var->id;

        $name = $var->name;
        $description = $var->description;
        $offerid = CatalogItemDto::getOfferId($id, $type);

        if ($offerid == 0) {
            return;
        }

        if (Helper::endsWith($name, " name") !== false || $name == "") {
            $nameCategory = $this->getCategoryName($id, $type);

            if ($nameCategory != "") {
                $name = ($nameCategory);
            }
        }

        if (Helper::endsWith($description, " desc") !== false || $description == "") {
            $description = "Parfait pour ton appart";
        }

        $name = $this->filter($name);
        $description = $this->filter($description);

        $var->name = $name;
        $var->description = $description;
        $var->offerid = (int)$offerid;
    }

    private function getCategoryName(string $id, string $type)
    {
        $pageId = CatalogItemDto::getPageIdBySpriteIdAndType($id, $type);
        if ($pageId == 0) {
            return "";
        }

        $page = CatalogPageDto::getCaptionById($pageId);
        if ($page == "") {
            return "";
        }
        
        return "Mobilier " . $page['caption'];
    }

    private function filter(string $str)
    {
        $str = str_replace('Habbo', 'Wibbo', $str);
        $str = str_replace('habbo', 'wibbo', $str);

        return $str;
    }
}