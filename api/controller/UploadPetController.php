<?php
class UploadPetController extends BaseController
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

        array_push($uploadData,
            array(
                'action' => 'upload',
                'path' => 'bundled/pet/' . $file["name"],
                'data' => $file["base64"],
            ),
        );

        if (!Helper::uploadApi('assets', $uploadData)) {
            throw new HttpException('Problème lors de l\'importation: ', 400);
        }

        LogSandboxDto::create($this->user['id'], 'post', 'pet', $fileName);
    }
}
