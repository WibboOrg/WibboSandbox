<?php
use Elliptic\EC;
require_once "Elliptic/EC.php";
require_once "Elliptic/Curves.php";
require_once "Elliptic/Keccak.php";

class Web3Controller extends BaseController
{
    public function get(Request $request)
    {
        $nonce = Helper::generateSalt(25);

        $message = "Signez ce message pour confirmer que vous possédez cette adresse de portefeuill. Cette action ne coûtera aucun frais\n\nNonce: " . $nonce;

        $tokenMessage = JWT::encode(['message' => $message]);

        return ['token' => $tokenMessage];
    }

    public function post(Request $request)
    {
        $dataStr = $request->getString(['username', 'message_token', 'address', 'signature']);

        $messageToken = JWT::decode($dataStr['message_token']);

        if (!$this->verifySignature($messageToken->message, $dataStr['signature'], $dataStr['address']))
            throw new HttpException('Signature incorrect', 400);

        $userLogin = UserDto::getOneByName($dataStr["username"]);

        if(!$userLogin) throw new HttpException("Identifiants incorrects", 400);
        
        if(empty($userLogin["password"]))
        {
            UserDto::updatePassword($userLogin["id"], $dataStr["address"]);
        }
        else if(!password_verify($dataStr["address"], $userLogin["password"])) throw new HttpException("Identifiants incorrects", 400);

        $token = JWT::encode(['id' => $userLogin["id"]]);

        return ["token" => $token];
    }

    protected function verifySignature(string $message, string $signature, string $address): bool
    {
        $hash = Keccak::hash(sprintf("\x19Ethereum Signed Message:\n%s%s", strlen($message), $message), 256);
        $sign = ["r" => substr($signature, 2, 64), "s" => substr($signature, 66, 64)];
        $recid = ord(hex2bin(substr($signature, 130, 2))) - 27;

        if ($recid != ($recid & 1))
            return false;

        $pubkey = (new EC('secp256k1'))->recoverPubKey($hash, $sign, $recid);
        $derived_adress = "0x" . substr(Keccak::hash(substr(hex2bin($pubkey->encode("hex")), 1), 256), 24);

        return strtolower($address) === $derived_adress;
    }
}
