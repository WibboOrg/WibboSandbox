<?php
class Database
{
    private ?PDO $conn = null;

    public function getConnection(): ?PDO
    {
        if($this->conn !== null) return $this->conn;

        try {
            $this->conn = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASSWORD);
            $this->conn->exec("set names utf8mb4");
        } catch (PDOException $exception) {
            throw new Exception("Database error: " . $exception->getMessage(), 500);
        }

        return $this->conn;
    }
}
