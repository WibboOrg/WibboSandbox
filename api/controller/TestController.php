<?php
class TestController extends BaseController
{
    public function get() //Read
    {
        return ["Hello" => "get"];
    }
    
    public function post() //Create
    {
        return ["Hello" => "post"];
    }
    
    public function put() //Update/Replace
    {
        return ["Hello" => "put"];
    }
    
    public function patch() //Update/Modify
    {
        return ["Hello" => "patch"];
    }
    
    public function delete() //Delete
    {
        return ["Hello" => "delete"];
    }
}
