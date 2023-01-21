<?php
class TestController extends BaseController
{
    public function get()
    {
        return ["Hello" => "get"];
    }
    
    public function post()
    {
        return ["Hello" => "post"];
    }
    
    public function put()
    {
        return ["Hello" => "put"];
    }
    
    public function patch()
    {
        return ["Hello" => "patch"];
    }
    
    public function delete()
    {
        return ["Hello" => "delete"];
    }
}
