<?php
class Helper
{
    public static function emptyArray(array $array): bool
    {
        foreach ($array as $key => $value) {
            if (empty($value)) {
                return true;
            }
        }

        return false;
    }

    public static function generateTicket(): string
    {
        return "ticket-" . md5(self::generateHash(rand(8, 12))) . "-ticket";
    }

    public static function generateHash(int $qtd): string
    {
        $characters = 'abcdefghijklmopqrstuvxwyzABCDEFGHIJKLMOPQRSTUVXWYZ0123456789';
        $hash = '';

        for ($x = 1; $x <= $qtd; $x++) {
            $postChar = rand(0, strlen($characters) - 1);
            $hash .= substr($characters, $postChar, 1);
        }

        return $hash;
    }

    public static function uploadApi(string $type, array $data): bool
    {
        if($type !== 'assets' && $type != 'cdn') {
            return false;
        }

        $options = [
            'http' => [
                'header' => "Content-type: application/x-www-form-urlencoded\r\nUser-Agent: Mozilla/5.0 (compatible; Wibbo/1.0; +https://wibbo.org/)\r\n", 
                'method'  => 'POST', 
                'content' => http_build_query($data)
            ]
        ];
		$context  = stream_context_create($options);
		$result = file_get_contents(UPLOAD_URL_ASSETS . UPLOAD_API, false, $context);
		if ($result === FALSE || $result !== 'ok') {
			return false;
		}

        return true;
    }

    public static function getSslPage(string $url, bool $isJson = false): string | object
    {
        $headers[] = 'User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:13.0) Gecko/20100101 Firefox/13.0.1';
        $headers[] = 'Accept: application/json, text/javascript, */*; q=0.01';
        $headers[] = 'Accept-Language: ar,en;q=0.5';
        $headers[] = 'Connection: keep-alive';

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_HEADER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_REFERER, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_COOKIESESSION, true);
        curl_setopt($ch, CURLOPT_USERAGENT, "User-Agent: Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/535.36 (KHTML, like Gecko) Chrome/36.0.1985.49 Safari/537.36");
        $result = curl_exec($ch);
        $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if($httpcode != 200 || $httpcode != 201) throw new HttpException('Erreur serveur getSslPage: ' . $url, 500);

        return ($isJson) ? json_decode($result) : $result;
    }
}
