<?php
class TextExternalController extends BaseController
{
    public array $minRank = ['GET' => 13, 'PATCH' => 13];

    public function get() 
    {
        $data = Helper::getSslPage('https://assets.wibbo.org/gamedata/ExternalTexts.json?'. time(), true);

        $newData = [];

        foreach($data as $key => $value)
            $newData[] = ["code" => $key, "text" => $value];

        return $newData;
    }

    public function patch()
    {
        $data = $this->getData(['code', 'text']);

        $badgeTexts = Helper::getSslPage('https://assets.wibbo.org/gamedata/ExternalTexts.json?'. time(), true);

        foreach ($badgeTexts as $code => &$text) {
            if($code == $data["code"]) {
                $text = $data["text"];
                break;
            }
        }

        $uploadData = array(
            array(
                'action' => 'upload',
                'path' => 'gamedata/ExternalTexts2.json',
                'data' => base64_encode(json_encode($badgeTexts)),
            )
        );

        if (!Helper::uploadApi('assets', $uploadData)) {
            throw new HttpException('Problème lors de l\'importation', 400);
        }

        LogSandboxDto::create($this->user['id'], 'patch', 'ExternalTexts.json', $data['code']);
    }
}