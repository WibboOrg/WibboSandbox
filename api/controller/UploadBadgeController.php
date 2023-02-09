<?php
class UploadBadgeController extends BaseController
{
    public array $minRank = ['POST' => 12];

    public function post(Request $request)
    {
        $file = $request->getFile();
        $dataStr = $request->getString(["code", "name", "description"]);

        $uploadData = array();

        if (!$file) {
            throw new HttpException("Fichier introuvable", 400);
        }

        if (!preg_match('/^[a-z0-9_]+\.gif$/', $file['name'])) {
            throw new HttpException('Nom du fichier ou extension incorrecte (mon_fichier_123.gif)', 400);
        }

        $size = getimagesizefromstring($file["base64"]);
        if ($size[1] > 40 || $size[0] > 40) {
            throw new Exception('La taille du badge est trop grande', 400);
        }

        $badgeJson = array("badge_name_" . $dataStr['code'] => $dataStr['name'], "badge_desc_" . $dataStr['code'] => $dataStr['description']);

        $uploadData = array(
            array(
                'action' => 'upload',
                'path' => 'c_images/album1584/' . $dataStr['code'] . '.gif',
                'data' => $file["base64"],
            ),
            array(
                'action' => 'json',
                'path' => 'gamedata/BadgeTexts.json',
                'data' => json_encode($badgeJson),
            ),
        );

        if (!Helper::uploadApi('assets', $uploadData)) {
            throw new HttpException('Problème lors de l\'importation: ', 400);
        }

        LogSandboxDto::create($this->user['id'], 'post', 'album1584', $dataStr['code']);
    }
}
