<?php
class BaseController
{
    private function requireData(?array $data, array $keyList)
    {
        if(!$data) throw new Exception('A field is missing', 400);

        foreach ($keyList as $key)
        {
            if(!array_key_exists($key, $data)) {
                throw new Exception('A field is missing', 400);
            }
        }
    }

    public function getData(array $data)
    {
        $input = json_decode(file_get_contents('php://input'), true);
        
        $this->requireData($input, $data);

        return $input;
    }

    public function getAuth()
    {
        $headers = apache_request_headers();
        $authorization = $headers['Authorization'] ?? null;
        if(!$authorization) throw new HttpException("Unauthorized", 401);

        $token = explode(' ', $authorization)[1];

        return JWT::decode($token);
    }

    public function get() 
    {
        throw new HttpException("Method get not found", 404);
    }

    public function post() 
    {
        throw new HttpException("Method post not found", 404);
    }

    public function put() 
    {
        throw new HttpException("Method put not found", 404);
    }

    public function patch() 
    {
        throw new HttpException("Method patch not found", 404);
    }

    public function delete() 
    {
        throw new HttpException("Method delete not found", 404);
    }

    public function send(array $data = [])
    {
        http_response_code(200);

        if (count($data) == 0) {
            echo json_encode([]);
        } else {
            echo json_encode($data);
        }
    }
}
