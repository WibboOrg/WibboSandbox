<?php
class TestController extends BaseController
{
    public function get() //Read
    {
        $this->send(["Hello" => "get"]);
    }
    
    public function post() //Create
    {
        $this->send(["Hello" => "post"]);
    }
    
    public function put() //Update/Replace
    {
        $this->send(["Hello" => "put"]);
    }
    
    public function patch() //Update/Modify
    {
        $this->send(["Hello" => "patch"]);
    }
    
    public function delete() //Delete
    {
        $this->send(["Hello" => "delete"]);
    }
}
