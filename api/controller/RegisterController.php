<?php
class RegisterController extends BaseController
{
    public function get()
    {
        $data = $this->getData(['username', 'password']);

        $userExist = UserDto::getIdByName($data["username"]);

        if($userExist) throw new HttpException("User name exist", 400);

        $userId = UserDto::create($data["username"], $data["password"]);

        $token = JWT::encode(['id' => $userId]);

        $this->send(["token" => $token]);
    }
}
