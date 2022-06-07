<?php
class UserModel extends BaseModel
{
    public string $tableName = "user";
    
    public int $id;
    public string $username;
    public string $password;

    public function __construct()
    {
        parent::__construct();
    }
}
