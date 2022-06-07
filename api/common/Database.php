<?php
class Database
{
    private ?PDO $conn = null;

    public function getConnection()
    {
        if($this->conn !== null) return $this->conn;

        try {
            $this->conn = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASSWORD);
            $this->conn->exec("set names utf8");
        } catch (PDOException $exception) {
            throw new Exception("Database error: " . $exception->getMessage(), 500);
        }

        return $this->conn;
    }
}
