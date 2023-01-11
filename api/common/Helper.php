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
}
