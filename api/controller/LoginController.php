<?php
class LoginController extends BaseController
{
    public function post()
    {
        $data = $this->getData(['username', 'password']);

        $userLogin = UserDto::getOneByName($data["username"]);

        if(!$userLogin) throw new HttpException("Identifiants incorrects", 400);
        
        if(empty($userLogin["password"]))
        {
            UserDto::updatePassword($userLogin["id"], $data["password"]);
        }
        else if(!password_verify($data["password"], $userLogin["password"])) throw new HttpException("Identifiants incorrects", 400);

        $token = JWT::encode(['id' => $userLogin["id"]]);

        return ["token" => $token];
    }
}
