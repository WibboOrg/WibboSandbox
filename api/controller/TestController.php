<?php
class TestController extends BaseController
{
    public function get()
    {
        $this->send(["Hello" => "get"]);
    }
    
    public function post()
    {
        $this->send(["Hello" => "post"]);
    }
    
    public function put()
    {
        $this->send(["Hello" => "put"]);
    }
    
    public function patch()
    {
        $this->send(["Hello" => "patch"]);
    }
    
    public function delete()
    {
        $this->send(["Hello" => "delete"]);
    }
}
