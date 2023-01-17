<?php
class BaseModel extends QueryBuilder
{
    public static ?Database $database = null;
    public ?PDO $conn = null;

    public function __construct()
    {
        parent::__construct();

        if(self::$database == null) self::$database = new Database();

        $this->conn = self::$database->getConnection();
    }
    
    public function first(): array | bool
    {
        $this->limit(1);
        $query = $this->getSelectQuery();
        $params = $this->getParams();

        $stmt = $this->execute($query, $params);

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    
    public function get(): array | bool
    {
        $query = $this->getSelectQuery();
        $params = $this->getParams();

        $stmt = $this->execute($query, $params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public function delete()
    {
        $query = $this->getDeleteQuery();
        $params = $this->getParams();

        $this->execute($query, $params);
    }

    public function update(array $params)
    {
        $query = $this->getUpdateQuery($params);

        $params = array_merge($params, $this->getParams());

        $this->execute($query, $params);
    }

    public function insert(array $params)
    {
        $query = $this->getInsertQuery($params);

        $this->execute($query, $params);
    }

    public function getLastInsertId(): int
    {
        return $this->conn->lastInsertId();
    }

    public function execute(string $query, array $params = [])
    {
        echo $query . "\n";
        $stmt = $this->conn->prepare($query);
        $stmt->execute($params);
        return $stmt;
    }
}
