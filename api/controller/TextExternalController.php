<?php
class TextExternalController extends BaseController
{
    public array $minRank = ['GET' => 11, 'PATCH' => 12, 'DELETE' => 12, 'POST' => 12];

    public function get(Request $request) 
    {
        $data = Helper::getSslPage(URL_ASSETS . 'gamedata-sandbox/ExternalTexts.json?'. time(), true);

        $newData = [];

        foreach($data as $key => $value)
            $newData[] = ["id" => $key, "code" => $key, "text" => $value];

        return $newData;
    }

    public function patch(Request $request)
    {
        $dataStr = $request->getString(['code', 'text']);

        $externalTexts = Helper::getSslPage(URL_ASSETS . 'gamedata-sandbox/ExternalTexts.json?'. time(), true);

        if (!property_exists($externalTexts, $dataStr["code"])) {
            throw new HttpException('Identifiant incorrect', 400);
        }

        $externalTexts->{$dataStr["code"]} = $dataStr["text"];

        $uploadData = array(
            array(
                'action' => 'upload',
                'path' => 'gamedata-sandbox/ExternalTexts.json',
                'data' => base64_encode(json_encode($externalTexts)),
            )
        );

        if (!Helper::uploadApi('assets', $uploadData)) {
            throw new HttpException('Problème lors de l\'importation', 400);
        }

        LogSandboxDto::create($this->user['id'], 'patch', 'ExternalTexts.json', $dataStr['code']);
    }

    public function post(Request $request)
    {
        $dataStr = $request->getString(['code', 'text']);

        $externalTexts = Helper::getSslPage(URL_ASSETS . 'gamedata-sandbox/ExternalTexts.json?'. time(), true);

        if (property_exists($externalTexts, $dataStr["code"])) {
            throw new HttpException('Identifiant est déjà utilisée', 400);
        }

        $externalTexts->{$dataStr["code"]} = $dataStr["text"];

        $uploadData = array(
            array(
                'action' => 'upload',
                'path' => 'gamedata-sandbox/ExternalTexts.json',
                'data' => base64_encode(json_encode($externalTexts)),
            )
        );

        if (!Helper::uploadApi('assets', $uploadData)) {
            throw new HttpException('Problème lors de l\'importation', 400);
        }

        LogSandboxDto::create($this->user['id'], 'post', 'ExternalTexts.json', $dataStr['code']);
    }

    public function delete(Request $request)
    {
        $dataStr = $request->getString(['id']);

        $externalTexts = Helper::getSslPage(URL_ASSETS . 'gamedata-sandbox/ExternalTexts.json?'. time(), true);

        if (!property_exists($externalTexts, $dataStr["id"])) {
            throw new HttpException('Identifiant incorrect', 400);
        }

        unset($externalTexts->{$dataStr["id"]});

        $uploadData = array(
            array(
                'action' => 'upload',
                'path' => 'gamedata-sandbox/ExternalTexts.json',
                'data' => base64_encode(json_encode($externalTexts)),
            )
        );

        if (!Helper::uploadApi('assets', $uploadData)) {
            throw new HttpException('Problème lors de l\'importation', 400);
        }

        LogSandboxDto::create($this->user['id'], 'delete', 'ExternalTexts.json', $dataStr['id']);
    }
}