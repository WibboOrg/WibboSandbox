<?php
class JWT 
{
    public static function decode(string $token): object
    {
        try 
        {
            list($header, $payload, $signature) = explode('.', $token);

            $header = base64_decode($header);
            $payload = base64_decode($payload);
            $signature = base64_decode($signature);

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

    public static function encode(array $data): string
    {
        try 
        {
            $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
            $payload = json_encode(array_merge($data, ['iat' => time()]));
            $signature = hash_hmac('sha256', $header . "." . $payload, TOKEN_SECRET, true);
            $token = base64_encode($header) . "." . base64_encode($payload) . "." . base64_encode($signature);

            return $token;
        } catch(Exception $e) {
            throw new HttpException("Invalid token", 401);
        }
    }
}