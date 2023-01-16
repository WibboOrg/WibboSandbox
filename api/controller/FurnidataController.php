<?php
class FurnidataController extends BaseController
{
    public function get() 
    {
        $furniDataJson = Helper::getSslPage('https://assets.wibbo.org/gamedata/FurnitureData.json');

        $furniData = json_decode($furniDataJson, JSON_OBJECT_AS_ARRAY);

        $fullData = array_merge_recursive($furniData["wallitemtypes"]["furnitype"], $furniData["roomitemtypes"]["furnitype"]);

        $data = [];

        foreach ($fullData as $var) 
        {
            $data[] = [
                'id' => $var['id'],
                'classname' => $var['classname'],
                'name' => $var['name'],
                'description' => $var['description']
            ];
        }

        return $data;
    }

    public function patch()
    {
        $data = $this->getData(['id', 'name', 'description']);

        $user = $this->getAuthUser();

        if ($user["rank"] < 13) {
            throw new HttpException("Vous n'avez pas les permissions requis", 400);
        }

        $furniData = Helper::getSslPage('https://assets.wibbo.org/gamedata/FurnitureData.json', true);

        foreach ($furniData->roomitemtypes->furnitype as $var) {
            if($var->id == $data["id"]) {
                $var->name = $data["name"];
                $var->description = $data["description"];
                break;
            }
        }

        foreach ($furniData->wallitemtypes->furnitype as $var) {
            if($var->id == $data["id"]) {
                $var->name = $data["name"];
                $var->description = $data["description"];
                break;
            }
        }

        $uploadData = array(
        array(
            'action' => 'upload',
            'path' => 'gamedata/FurnitureData2.json',
            'data' => base64_encode(json_encode($furniData)),
        ));

        if (!Helper::uploadApi('assets', $uploadData)) {
            throw new HttpException('Problème lors de l\'importation', 400);
        }
    }
}