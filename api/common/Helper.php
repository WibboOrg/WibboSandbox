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
        return "ticket-" . hash('sha256', self::generateSalt(10)) . "-ticket";
    }

    public static function generateSalt(int $length = 10)
    {
        //set up random characters
        $chars = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
        //get the length of the random characters
        $char_len = strlen($chars) - 1;
        //store output
        $output = '';
        //iterate over $chars
        while (strlen($output) < $length) {
            /* get random characters and append to output till the length of the output
            is greater than the length provided */
            $output .= $chars[rand(0, $char_len)];
        }
        //return the result
        return hash('sha256', NONCE_SECRET . $output);
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
		$result = file_get_contents($type === 'assets' ? UPLOAD_URL_ASSETS : UPLOAD_URL_CDN, false, $context);

		if ($result === FALSE || $result !== 'ok') {
			return false;
		}

        return true;
    }

    public static function getSslPage(string $url, bool $isJson = false): string | object | array
    {
        $headers[] = 'User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:13.0) Gecko/20100101 Firefox/13.0.1';
        $headers[] = 'Accept: application/json, text/javascript, */*; q=0.01';
        $headers[] = 'Accept-Language: ar,en;q=0.5';
        $headers[] = 'Connection: keep-alive';

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_REFERER, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_COOKIESESSION, true);
        curl_setopt($ch, CURLOPT_USERAGENT, "User-Agent: Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/535.36 (KHTML, like Gecko) Chrome/36.0.1985.49 Safari/537.36");
        $result = curl_exec($ch);
        $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if($httpcode != 200 && $httpcode != 201) throw new HttpException('Erreur serveur getSslPage: ' . $url, 500);

        return ($isJson) ? json_decode($result) : $result;
    }
}
