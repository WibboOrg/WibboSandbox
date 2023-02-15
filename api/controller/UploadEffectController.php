<?php
class UploadEffectController extends BaseController
{
    public array $minRank = ['POST' => 12];

    public function post(Request $request)
    {
        $file = $request->getFile();
        $dataInt = $request->getNumber(["id"]);
        $dataBool = $request->getBoolean(["only_staff"]);
        
        $uploadData = array();

        if (!$file) {
            throw new HttpException("Fichier introuvable", 400);
        }

        if (!preg_match('/^[A-Za-z0-9_]+\.nitro$/', $file["name"])) {
            throw new HttpException('Nom du fichier ou extension incorrecte (mon_fichier_123.nitro)', 400);
        }

        if(EmulatorEffectDto::getOne($dataInt['id'])) {
            throw new HttpException('Effet id déjà pris', 400);
        }

        $fileName = explode(".nitro", $file["name"])[0];

        $effectMap = [
            'effects' => [
                'id' => $dataInt['id'],
                'lib' => $fileName,
                'type' => 'fx',
                'revision' => 55555
            ]
        ];
        
        array_push($uploadData,
            array(
                'action' => 'json',
                'path' => 'gamedata-sandbox/EffectMap.json',
                'data' => json_encode($effectMap),
            ),
            array(
                'action' => 'upload',
                'path' => 'bundled/effect/' . $file["name"],
                'data' => $file["base64"],
            ),
        );

        if (!Helper::uploadApi('assets', $uploadData)) {
            throw new HttpException('Problème lors de l\'importation: ', 400);
        }

        EmulatorEffectDto::create($dataInt['id'], $dataBool['only_staff']);
        LogSandboxDto::create($this->user['id'], 'post', 'effect', $fileName);
    }
}
