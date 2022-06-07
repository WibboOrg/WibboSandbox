<?php
class LoginController extends BaseController
{
    public function post()
    {
        $data = $this->getData(['username', 'password']);

        $userLogin = UserDto::getOneByName($data["username"]);

        if(!$userLogin) throw new HttpException("User not found", 404);
        
        if(empty($userLogin["password"]))
        {
            UserDto::updatePassword($userLogin["id"], $data["password"]);
        }
        else if(!password_verify($data["password"], $userLogin["password"])) throw new HttpException("Invalid password", 401);

        $token = JWT::encode(['id' => $userLogin["id"]]);

        $this->send(["token" => $token]);
    }
}
