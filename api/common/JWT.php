<?php
class JWT 
{
    public static function decode(string $token)
    {
        try 
        {
            list($header, $payload, $signature) = explode('.', base64_decode($token));

            $signatureVerif = hash_hmac('sha256', $header . "." . $payload, TOKEN_SECRET, true);

            if ($signatureVerif !== $signature) {
                throw new HttpException("Invalid token", 401);
            }

            $decoded = json_decode($payload);

            if ($decoded->iat + TOKEN_EXPIRE < time()) {
                throw new HttpException("Token expired", 401);
            }

            return json_decode($payload);
        } catch(HttpException $e) {
            throw new HttpException($e->getMessage(), $e->getCode());
        } catch(Exception $e) {
            throw new HttpException("Invalid token", 401);
        }
    }

    public static function encode(array $data)
    {
        try 
        {
            $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
            $payload = json_encode(array_merge($data, ['iat' => time()]));
            $signature = hash_hmac('sha256', $header . "." . $payload, TOKEN_SECRET, true);
            $token = base64_encode($header . "." . $payload . "." . $signature);

            return $token;
        } catch(Exception $e) {
            throw new HttpException("Invalid token", 401);
        }
    }
}