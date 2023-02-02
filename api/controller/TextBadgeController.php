<?php
class TextBadgeController extends BaseController
{
    public array $minRank = ['GET' => 13, 'POST' => 13, 'DELETE' => 13, 'PATCH' => 13];

    public function get() 
    {
        $data = Helper::getSslPage('https://assets.wibbo.org/gamedata/BadgeTexts.json?'. time(), true);

        $newData = [];

        foreach($data as $key => $value)
            $newData[] = ["code" => $key, "text" => $value];

        return $newData;
    }

    public function patch()
    {
        $data = $this->getData(['code', 'text']);

        $badgeTexts = Helper::getSslPage('https://assets.wibbo.org/gamedata/BadgeTexts.json?'. time(), true);

        foreach ($badgeTexts as $code => &$text) {
            if($code == $data["code"]) {
                $text = $data["text"];
                break;
            }
        }

        $uploadData = array(
            array(
                'action' => 'upload',
                'path' => 'gamedata/BadgeTexts2.json',
                'data' => base64_encode(json_encode($badgeTexts)),
            )
        );

        if (!Helper::uploadApi('assets', $uploadData)) {
            throw new HttpException('Problème lors de l\'importation', 400);
        }

        LogSandboxDto::create($this->user['id'], 'patch', 'BadgeTexts.json', $data['code']);
    }

    public function delete()
    {
        $data = $this->getData(['id']);

        $badgeTexts = Helper::getSslPage('https://assets.wibbo.org/gamedata/BadgeTexts.json?'. time(), true);

        foreach ($badgeTexts as $code => &$text) {
            if($code == $data["id"]) {
                unset($badgeTexts->{$code});
                break;
            }
        }

        $uploadData = array(
            array(
                'action' => 'upload',
                'path' => 'gamedata/BadgeTexts.json',
                'data' => base64_encode(json_encode($badgeTexts)),
            )
        );

        if (!Helper::uploadApi('assets', $uploadData)) {
            throw new HttpException('Problème lors de l\'importation', 400);
        }

        LogSandboxDto::create($this->user['id'], 'delete', 'BadgeTexts.json', $data['id']);
    }
}