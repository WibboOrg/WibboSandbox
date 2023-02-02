<?php
class TextUIController extends BaseController
{
    public array $minRank = ['GET' => 13, 'PATCH' => 13];

    public function get(Request $request) 
    {
        $data = Helper::getSslPage(URL_ASSETS . 'gamedata/UITexts.json?'. time(), true);

        $newData = [];

        foreach($data as $key => $value)
            $newData[] = ["code" => $key, "text" => $value];

        return $newData;
    }

    public function patch(Request $request)
    {
        $dataStr = $request->getString(['code', 'text']);

        $badgeTexts = Helper::getSslPage(URL_ASSETS . 'gamedata/UITexts.json?'. time(), true);

        foreach ($badgeTexts as $code => &$text) {
            if($code == $dataStr["code"]) {
                $text = $dataStr["text"];
                break;
            }
        }

        $uploadData = array(
            array(
                'action' => 'upload',
                'path' => 'gamedata/UITexts.json',
                'data' => base64_encode(json_encode($badgeTexts)),
            )
        );

        if (!Helper::uploadApi('assets', $uploadData)) {
            throw new HttpException('Problème lors de l\'importation', 400);
        }

        LogSandboxDto::create($this->user['id'], 'patch', 'FurnitureData.json', $dataStr['code']);
    }
}