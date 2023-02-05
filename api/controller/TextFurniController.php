<?php
class TextFurniController extends BaseController
{
    public array $minRank = ['GET' => 11, 'PATCH' => 12];

    public function get(Request $request) 
    {
        $furniDataJson = Helper::getSslPage(URL_ASSETS . 'gamedata/FurnitureData.json?'. time());

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

    public function patch(Request $request)
    {
        $dataInt = $request->getNumber(['id']);
        $dataStr = $request->getString(['name', 'description']);

        $furniData = Helper::getSslPage(URL_ASSETS . 'gamedata/FurnitureData.json?'. time(), true);

        foreach ($furniData->roomitemtypes->furnitype as $var) {
            if($var->id == $dataInt["id"]) {
                $var->name = $dataStr["name"];
                $var->description = $dataStr["description"];
                break;
            }
        }

        foreach ($furniData->wallitemtypes->furnitype as $var) {
            if($var->id == $dataInt["id"]) {
                $var->name = $dataStr["name"];
                $var->description = $dataStr["description"];
                break;
            }
        }

        $uploadData = array(
            array(
                'action' => 'upload',
                'path' => 'gamedata/FurnitureData.json',
                'data' => base64_encode(json_encode($furniData)),
            )
        );

        if (!Helper::uploadApi('assets', $uploadData)) {
            throw new HttpException('Problème lors de l\'importation', 400);
        }

        LogSandboxDto::create($this->user['id'], 'patch', 'FurnitureData.json', $dataInt['id']);
    }
}