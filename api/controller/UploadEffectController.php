<?php
class UploadEffectController extends BaseController
{
    public array $minRank = ['POST' => 13];

    public function post()
    {
        $data = $this->getData(["id", "file"]);
        
        $uploadData = array();

        $file = $data["file"];

        if (!$file) {
            throw new HttpException("Fichier introuvable", 400);
        }

        if (!preg_match('/^[a-z0-9_]+\.nitro$/', $file["name"])) {
            throw new HttpException('Nom du fichier ou extension incorrecte (.nitro)', 400);
        }

        if(!is_int($data['id'])) {
            throw new HttpException('Id format incorrect', 400);
        }

        if(EmulatorEffectDto::getOne((int)$data['id'])) {
            throw new HttpException('Effet id déjà pris', 400);
        }

        $fileName = explode(".nitro", $file["name"])[0];

        $effectMap = [
            'effects' => [
                'id' => (int)$data['id'],
                'lib' => $fileName,
                'type' => 'fx',
                'revision' => 55555
            ]
        ];
        
        array_push($uploadData,
            array(
                'action' => 'json',
                'path' => 'gamedata/EffectMap2.json',
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

        EmulatorEffectDto::create((int)$data['id'], $data['only_staff'] === 1);
        LogSandboxDto::create($this->user['id'], 'post', 'effect', $fileName);
    }
}
