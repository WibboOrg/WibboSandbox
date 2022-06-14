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
}
