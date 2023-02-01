<?php
class UploadClotheController extends BaseController
{
    public array $minRank = ['POST' => 13];

    public function post()
    {
        $data = $this->getData(["type", "name", "description", "file"]);
        
        $uploadData = array();

        $file = $data["file"];

        if (!$file) {
            throw new HttpException("Fichier introuvable", 400);
        }

        if (!preg_match('/^[a-z0-9_]+\.nitro$/', $file["name"])) {
            throw new HttpException('Nom du fichier ou extension incorrecte (.nitro)', 400);
        }

        $fileName = explode(".nitro", $file["name"])[0];

        $figureMap = [];
        $figureData = [];

        array_push($uploadData,
            array(
                'action' => 'json',
                'path' => 'gamedata/FigureMap2.json',
                'data' => json_encode($figureMap),
            ),
            array(
                'action' => 'json',
                'path' => 'gamedata/FigureData2.json',
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
