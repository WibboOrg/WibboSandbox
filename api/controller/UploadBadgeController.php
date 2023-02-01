<?php
class UploadBadgeController extends BaseController
{
    public array $minRank = ['POST' => 13];

    public function post()
    {
        $data = $this->getData(["code", "name", "description", "file"]);

        $uploadData = array();

        $file = $data["file"];

        if (!$file) {
            throw new HttpException("Fichier introuvable", 400);
        }

        if (!preg_match('/^[a-z0-9_]+\.gif$/', $file['name'])) {
            throw new HttpException('Nom du fichier ou extension incorrecte (.gif)', 400);
        }

        $size = getimagesizefromstring($file["base64"]);
        if ($size[1] > 40 || $size[0] > 40) {
            throw new Exception('La taille du badge est trop grande', 400);
        }

        $badgeJson = array("badge_name_" . $data['code'] => $data['name'], "badge_desc_" . $data['code'] => $data['description']);

        $uploadData = array(
            array(
                'action' => 'upload',
                'path' => 'c_images/album1584/' . $data['code'] . '.gif',
                'data' => $file["base64"],
            ),
            array(
                'action' => 'json',
                'path' => 'gamedata/BadgeTexts2.json',
                'data' => json_encode($badgeJson),
            ),
        );

        if (!Helper::uploadApi('assets', $uploadData)) {
            throw new HttpException('Problème lors de l\'importation: ', 400);
        }

        LogSandboxDto::create($this->user['id'], 'post', 'album1584', $data['code']);
    }
}
