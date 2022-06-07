<?php
class RegisterController extends BaseController
{
    public function get()
    {
        $data = $this->getData(['username', 'password']);

        $userLogin = UserDto::getIdByName($data["username"]);

        if($userLogin) throw new HttpException("User name exist", 400);

        $userId = UserDto::create($data["username"], $data["password"]);

        $token = JWT::encode(['id' => $userId]);

        $this->send(["token" => $token]);
    }
}
