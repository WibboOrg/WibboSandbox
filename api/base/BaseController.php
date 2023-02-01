<?php
class BaseController
{
    public array $user;
    public array $minRank = ['GET' => 13, 'POST' => 13, 'DELETE' => 13, 'PATCH' => 13, 'PUT' => 13];
    
    private function requireData(?array $data, array $keyList)
    {
        if(!$data) throw new Exception('Un champ est manquent', 400);

        foreach ($keyList as $key)
        {
            if(!array_key_exists($key, $data)) {
                throw new Exception('Un champ est manquent', 400);
            }
        }
    }

    public function getData(array $data): array
    {
        $input = json_decode(file_get_contents('php://input'), true);
        
        $this->requireData($input, $data);

        return $input;
    }

    private function getAuth(): object
    {
        $headers = apache_request_headers();
        $authorization = $headers['Authorization'] ?? null;
        if(!$authorization) throw new HttpException("Authentification échouer", 401);

        $token = explode(' ', $authorization)[1];

        return JWT::decode($token);
    }

    public function getAuthUser()
    {
        $user = UserDto::getOne($this->getAuth()->id);

        if(!$user) throw new HttpException("L'utilisateur n'existe pas", 401);

        $this->user = $user;

        return $user;
    }

    public function get() //Read
    {
        throw new HttpException("Method get not found", 404);
    }

    public function post() //Create
    {
        throw new HttpException("Method post not found", 404);
    }

    public function put() //Update/Replace
    {
        throw new HttpException("Method put not found", 404);
    }

    public function patch() //Update/Modify
    {
        throw new HttpException("Method patch not found", 404);
    }

    public function delete() //Delete
    {
        throw new HttpException("Method delete not found", 404);
    }
}
