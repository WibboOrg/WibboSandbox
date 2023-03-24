<?php
error_reporting(E_ERROR | E_PARSE);

require_all(['common', 'base', 'controller', 'model', 'dto']);

function parseRoute()
{
    $request = (isset($_GET["page"])) ? $_GET["page"] : explode('&', $_SERVER['QUERY_STRING'], 2)[0];
    $request = str_starts_with($request, '/') ? substr($request, '1') : $request;
    $method = strtoupper($_SERVER["REQUEST_METHOD"]);

    $className = ucfirst(strtolower($request)) . "Controller";

    if(class_exists($className, false) === false) throw new HttpException("Controller not found for path: " . $request, 404);

    $controller = new $className();

    if($className !== 'AuthController' && $className !== 'Web3Controller')
    {
        $user = $controller->getAuthUser();

        $minRank = $controller->minRank[$method];

        if ($minRank > $user['rank'])
            throw new HttpException('Permission requis', 400);
    }

    $request = new Request();

    switch ($method) {
        case 'GET':
            $data = $controller->get($request);
            break;
        case 'POST':
            $data = $controller->post($request);
            break;
        case 'DELETE':
            $data = $controller->delete($request);
            break;
        case 'PATCH':
            $data = $controller->patch($request);
            break;
        case 'PUT':
            $data = $controller->put($request);
            break;
        default:
            throw new HttpException("Controller method (" . $method . ") not found for path: " . $request, 404);
    }

    http_response_code(200);

    if ($data == null) {
        echo json_encode([]);
    } else {
        echo json_encode($data);
    }
}

try {
    headers();
    parseRoute();
} catch (HttpException $e) {
    http_response_code($e->getCode());
    echo json_encode(["statut" => "error", "message" => $e->getMessage(), "code" => $e->getCode()]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["statut" => "error", "message" => "Une exception s'est produite: " . $e->getMessage()]);
} catch (Error $e) {
    http_response_code(500);
    echo json_encode(["statut" => "error", "message" => "Une erreur est survenue: " . $e->getMessage()]);
}

function headers() 
{
    if (isset($_SERVER['HTTP_ORIGIN'])) 
    {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');
    }
    
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') 
    {    
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT, PATCH, OPTIONS");
        
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    
        exit(0);
    }

    header('Content-Type: application/json');
}

function require_all(array $directory)
{
    foreach ($directory as $folder) {
        foreach (glob("{$folder}/*.php") as $filename) {
            require $filename;
        }
    }
}