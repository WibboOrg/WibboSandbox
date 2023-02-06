<?php
class UploadClotheController extends BaseController
{
    public array $minRank = ['POST' => 12];

    public function post(Request $request)
    {
        $file = $request->getFile();
        $dataInt = $request->getString(["id"]);
        $dataStr = $request->getString(["type"]);
        $dataArray = $request->getArray(["parts"]);
        
        $uploadData = array();

        if (!$file) {
            throw new HttpException("Fichier introuvable", 400);
        }

        if (!preg_match('/^[a-z0-9_]+\.nitro$/', $file["name"])) {
            throw new HttpException('Nom du fichier ou extension incorrecte (.nitro)', 400);
        }

        $fileName = explode(".nitro", $file["name"])[0];

        $figureMap = [
            "libraries" => array([
                "id" => $fileName,
                "revision" => 55555,
                "parts" => array_map(function (array $value) {
                    return [
                        "id" => $value['id'],
                        "type" => $value['type']
                    ];
            }, $dataArray["parts"])
            ])
        ];

        $figureDataSet = [
            "id" => $dataInt['id'],
            "gender" => 'U',
            "club" => 0,
            "colorable" => true,
            "selectable" => true,
            "preselectable" => false,
            "sellable" => false,
            "parts" => array_map(function (array $value) {
                return [
                    "id" => $value['id'],
                    "type" => $value['type'],
                    "colorable" => $value['colorable'],
                    "index" => $value['index'],
                    "colorindex" => $value['colorindex']
                ];
            }, $dataArray["parts"]),
        ];

        $figureDataJson = Helper::getSslPage(URL_ASSETS . 'gamedata-sandbox/FigureData.json?'. time(), true);
        
        foreach($figureDataJson->setTypes as &$setType)
        {
            if ($setType->type !== $dataStr['type'])
                continue;
        
            array_push($setType->sets, $figureDataSet);
            break;
        }

        array_push($uploadData,
            array(
                'action' => 'json',
                'path' => 'gamedata-sandbox/FigureMap.json',
                'data' => json_encode($figureMap),
            ),
            array(
                'action' => 'upload',
                'path' => 'gamedata-sandbox/FigureData.json',
                'data' => base64_encode(json_encode($figureDataJson)),
            ),
            array(
                'action' => 'upload',
                'path' => 'bundled/figure/' . $file["name"],
                'data' => $file["base64"],
            ),
        );

        if (!Helper::uploadApi('assets', $uploadData)) {
            throw new HttpException('Problème lors de l\'importation: ', 400);
        }

        LogSandboxDto::create($this->user['id'], 'post', 'figure', $fileName);
    }
}
