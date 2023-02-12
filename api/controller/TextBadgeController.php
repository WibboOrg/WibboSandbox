<?php
class TextBadgeController extends BaseController
{
    public array $minRank = ['GET' => 11, 'POST' => 12, 'DELETE' => 12, 'PATCH' => 12];

    public function get(Request $request) 
    {
        $data = Helper::getSslPage(URL_ASSETS . 'gamedata-sandbox/BadgeTexts.json?'. time(), true);

        $newData = [];

        foreach($data as $key => $value)
            $newData[] = ["id" => $key, "code" => $key, "text" => $value];

        return $newData;
    }

    public function patch(Request $request)
    {
        $dataStr = $request->getString(['code', 'text']);

        $badgeTexts = Helper::getSslPage(URL_ASSETS . 'gamedata-sandbox/BadgeTexts.json?'. time(), true);

        if (!property_exists($badgeTexts, $dataStr["code"]))
        {
            throw new HttpException('Identifiant incorrect', 400);
        }
        
        $badgeTexts->{$dataStr} = $dataStr["text"];

        $uploadData = array(
            array(
                'action' => 'upload',
                'path' => 'gamedata-sandbox/BadgeTexts.json',
                'data' => base64_encode(json_encode($badgeTexts)),
            )
        );

        if (!Helper::uploadApi('assets', $uploadData)) {
            throw new HttpException('Problème lors de l\'importation', 400);
        }

        LogSandboxDto::create($this->user['id'], 'patch', 'BadgeTexts.json', $dataStr['code']);
    }

    public function post(Request $request)
    {
        $dataStr = $request->getString(['code', 'text']);

        $badgeTexts = Helper::getSslPage(URL_ASSETS . 'gamedata-sandbox/BadgeTexts.json?'. time(), true);

        if (property_exists($badgeTexts, $dataStr["code"])) {
            throw new HttpException('Identifiant est déjà utilisée', 400);
        }

        $badgeTexts->{$dataStr["code"]} = $dataStr["text"];

        $uploadData = array(
            array(
                'action' => 'upload',
                'path' => 'gamedata-sandbox/BadgeTexts.json',
                'data' => base64_encode(json_encode($badgeTexts)),
            )
        );

        if (!Helper::uploadApi('assets', $uploadData)) {
            throw new HttpException('Problème lors de l\'importation', 400);
        }

        LogSandboxDto::create($this->user['id'], 'post', 'BadgeTexts.json', $dataStr['code']);
    }

    public function delete(Request $request)
    {
        $dataStr = $request->getString(['id']);

        $badgeTexts = Helper::getSslPage(URL_ASSETS . 'gamedata-sandbox/BadgeTexts.json?'. time(), true);

        if (!property_exists($badgeTexts, $dataStr["id"])) {
            throw new HttpException('Identifiant incorrect', 400);
        }

        unset($badgeTexts->{$dataStr["id"]});

        $uploadData = array(
            array(
                'action' => 'upload',
                'path' => 'gamedata-sandbox/BadgeTexts.json',
                'data' => base64_encode(json_encode($badgeTexts)),
            )
        );

        if (!Helper::uploadApi('assets', $uploadData)) {
            throw new HttpException('Problème lors de l\'importation', 400);
        }

        LogSandboxDto::create($this->user['id'], 'delete', 'BadgeTexts.json', $dataStr['id']);
    }
}