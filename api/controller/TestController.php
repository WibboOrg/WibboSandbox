<?php
class TestController extends BaseController
{
    public function get()
    {
        $this->send(["Hello" => "Word"]);
    }
    
    public function post()
    {
        $this->send(["Hello" => "Word"]);
    }
    
    public function put()
    {
        $this->send(["Hello" => "Word"]);
    }
    
    public function patch()
    {
        $this->send(["Hello" => "Word"]);
    }
    
    public function delete()
    {
        $this->send(["Hello" => "Word"]);
    }
}
