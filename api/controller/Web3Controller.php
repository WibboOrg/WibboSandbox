<?php
use Elliptic\EC;
require_once "Elliptic/EC.php";
require_once "Elliptic/Curves.php";
require_once "Elliptic/Keccak.php";

class Web3Controller extends BaseController
{
    public function get()
    {
        $nonce = Helper::generateSalt(25);

        $message = "Signez ce message pour confirmer que vous possédez cette adresse de portefeuill. Cette action ne coûtera aucun frais\n\nNonce: " . $nonce;

        $tokenMessage = JWT::encode(['message' => $message]);

        return ['token' => $tokenMessage];
    }

    public function post()
    {
        $data = $this->getData(['username', 'message_token', 'address', 'signature']);

        $signMessage = JWT::decode($data['message_token'])->message;

        if (!$this->verifySignature($signMessage, $data['signature'], $data['address']))
            throw new HttpException('Signature incorrect', 400);

        $userLogin = UserDto::getOneByName($data["username"]);

        if(!$userLogin) throw new HttpException("Identifiants incorrects", 400);
        
        if(empty($userLogin["password"]))
        {
            UserDto::updatePassword($userLogin["id"], $data["address"]);
        }
        else if(!password_verify($data["address"], $userLogin["password"])) throw new HttpException("Identifiants incorrects", 400);

        $token = JWT::encode(['id' => $userLogin["id"]]);

        return ["token" => $token];
    }

    protected function verifySignature(string $message, string $signature, string $address): bool
    {
        $hash = Keccak::hash(sprintf("\x19Ethereum Signed Message:\n%s%s", strlen($message), $message), 256);
        $sign   = ["r" => substr($signature, 2, 64),
                "s" => substr($signature, 66, 64)];
        $recid  = ord(hex2bin(substr($signature, 130, 2))) - 27;

        if ($recid != ($recid & 1))
            return false;

        $pubkey = (new EC('secp256k1'))->recoverPubKey($hash, $sign, $recid);
        $derived_adress = "0x" . substr(Keccak::hash(substr(hex2bin($pubkey->encode("hex")), 1), 256), 24);

        return strtolower($address) === $derived_adress;
    }
}