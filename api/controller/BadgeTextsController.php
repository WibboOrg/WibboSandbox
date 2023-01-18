<?php
class BadgeTextsController extends BaseController
{
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

        $user = $this->getAuthUser();

        if ($user["rank"] < 13) {
            throw new HttpException("Vous n'avez pas les permissions requis", 400);
        }

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
        ));

        if (!Helper::uploadApi('assets', $uploadData)) {
            throw new HttpException('Problème lors de l\'importation', 400);
        }
    }
}