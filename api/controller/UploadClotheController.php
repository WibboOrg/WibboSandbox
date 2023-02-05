<?php
class UploadClotheController extends BaseController
{
    public array $minRank = ['POST' => 12];

    public function post(Request $request)
    {
        $file = $request->getFile();
        $dataInt = $request->getString(["id"]);
        $dataStr = $request->getString(["type", "name", "description"]);
        $dataArray = $request->getArray(["parts"]);

        // $figureMapJson = Helper::getSslPage(URL_ASSETS . 'gamedata/FigureMap.json', true);
        // $figureDataJson = Helper::getSslPage(URL_ASSETS . 'gamedata/FigureData.json', true);
        
        $uploadData = array();

        if (!$file) {
            throw new HttpException("Fichier introuvable", 400);
        }

        if (!preg_match('/^[a-z0-9_]+\.nitro$/', $file["name"])) {
            throw new HttpException('Nom du fichier ou extension incorrecte (.nitro)', 400);
        }

        $fileName = explode(".nitro", $file["name"])[0];

        $figureMap = [
            "libraries" => [
                "id" => $fileName,
                "revision" => 67417,
                "parts" => [
                    "id" => 1,
                    "type" => "ha"
                ],
            ]
        ];
        $figureData = [
            "id" => $dataInt['id'],
            "gender" => 'U',
            "club" => 0,
            "colorable" => true,
            "selectable" => true,
            "preselectable" => false,
            "sellable" => false,
            "parts" => [
                "id" => 1,
                "type" => "ha",
                "colorable" => true,
                "index" => 0,
                "colorindex" => 1
            ],
        ];

        array_push($uploadData,
            array(
                'action' => 'json',
                'path' => 'gamedata/FigureMap.json',
                'data' => json_encode($figureMap),
            ),
            array(
                'action' => 'json',
                'path' => 'gamedata/FigureData.json',
                'data' => json_encode($figureData),
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
