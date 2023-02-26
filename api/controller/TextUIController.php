<?php
class TextUIController extends BaseController
{
    public array $minRank = ['GET' => 11, 'PATCH' => 12, 'DELETE' => 12, 'POST' => 12];

    public function get(Request $request) 
    {
        $data = Helper::getSslPage(URL_ASSETS . 'gamedata-sandbox/UITexts.json?'. time(), true);

        $newData = [];

        foreach ($data as $key => $value) 
            if($key != "") $newData[] = ["id" => $key, "code" => $key, "text" => $value];

        return $newData;
    }

    public function patch(Request $request)
    {
        $dataStr = $request->getString(['code', 'text']);

        $uiTexts = Helper::getSslPage(URL_ASSETS . 'gamedata-sandbox/UITexts.json?'. time(), true);

        if (!property_exists($uiTexts, $dataStr["code"]) || $dataStr["code"] == "") {
            throw new HttpException('Identifiant incorrect', 400);
        }

        $uiTexts->{$dataStr["code"]} = $dataStr["text"];

        $uploadData = array(
            array(
                'action' => 'upload',
                'path' => 'gamedata-sandbox/UITexts.json',
                'data' => base64_encode(json_encode($uiTexts)),
            )
        );

        if (!Helper::uploadApi('assets', $uploadData)) {
            throw new HttpException('Problème lors de l\'importation', 400);
        }

        LogSandboxDto::create($this->user['id'], 'patch', 'UITexts.json', $dataStr['code']);
    }

    public function post(Request $request)
    {
        $dataStr = $request->getString(['code', 'text']);

        $uiTexts = Helper::getSslPage(URL_ASSETS . 'gamedata-sandbox/UITexts.json?'. time(), true);

        if (!property_exists($uiTexts, $dataStr["code"]) || $dataStr["code"] == "") {
            throw new HttpException('Identifiant est déjà utilisée', 400);
        }

        $uiTexts->{$dataStr["code"]} = $dataStr["text"];

        $uploadData = array(
            array(
                'action' => 'upload',
                'path' => 'gamedata-sandbox/UITexts.json',
                'data' => base64_encode(json_encode($uiTexts)),
            )
        );

        if (!Helper::uploadApi('assets', $uploadData)) {
            throw new HttpException('Problème lors de l\'importation', 400);
        }

        LogSandboxDto::create($this->user['id'], 'post', 'UITexts.json', $dataStr['code']);
    }

    public function delete(Request $request)
    {
        $dataStr = $request->getString(['id']);

        $uiTexts = Helper::getSslPage(URL_ASSETS . 'gamedata-sandbox/UITexts.json?'. time(), true);

        if (!property_exists($uiTexts, $dataStr["id"])) {
            throw new HttpException('Identifiant incorrect', 400);
        }

        unset($uiTexts->{$dataStr["id"]});

        $uploadData = array(
            array(
                'action' => 'upload',
                'path' => 'gamedata-sandbox/ExternalTexts.json',
                'data' => base64_encode(json_encode($uiTexts)),
            )
        );

        if (!Helper::uploadApi('assets', $uploadData)) {
            throw new HttpException('Problème lors de l\'importation', 400);
        }

        LogSandboxDto::create($this->user['id'], 'delete', 'UITexts.json', $dataStr['id']);
    }
}