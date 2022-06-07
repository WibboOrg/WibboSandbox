<?php
class BaseModel
{
    public static ?Database $database = null;
    
    public ?PDO $conn = null;

    public function __construct()
    {
        if(self::$database == null) self::$database = new Database();

        $this->conn = self::$database->getConnection();
    }
}
