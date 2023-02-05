<?php
class TextBadgeController extends BaseController
{
    public array $minRank = ['GET' => 11, 'POST' => 12, 'DELETE' => 12, 'PATCH' => 12];

    public function get(Request $request) 
    {
        $data = Helper::getSslPage(URL_ASSETS . 'gamedata/BadgeTexts.json?'. time(), true);

        $newData = [];

        foreach($data as $key => $value)
            $newData[] = ["code" => $key, "text" => $value];

        return $newData;
    }

    public function patch(Request $request)
    {
        $dataStr = $request->getString(['code', 'text']);

        $badgeTexts = Helper::getSslPage(URL_ASSETS . 'gamedata/BadgeTexts.json?'. time(), true);

        foreach ($badgeTexts as $code => &$text) {
            if($code == $dataStr["code"]) {
                $text = $dataStr["text"];
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

        LogSandboxDto::create($this->user['id'], 'patch', 'BadgeTexts.json', $dataStr['code']);
    }

    public function delete(Request $request)
    {
        $dataStr = $request->getString(['id']);

        $badgeTexts = Helper::getSslPage(URL_ASSETS . 'gamedata/BadgeTexts.json?'. time(), true);

        foreach ($badgeTexts as $code => &$text) {
            if($code == $dataStr["id"]) {
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

        LogSandboxDto::create($this->user['id'], 'delete', 'BadgeTexts.json', $dataStr['id']);
    }
}