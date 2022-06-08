<?php
class QueryBuilder
{
    private array $selects;
    private array $wheres;
    private int $limit;

    public function __construct()
    {
        $this->selects = [];
        $this->wheres = [];
        $this->limit = 0;
    }

    public function select(string ...$selects)
    {
        $this->selects = $selects;
        
        return $this;
    }

    public function where(string $column, string $operatorOrValue, $value = null)
    {
        if($value === null)
        {
            $value  = $operatorOrValue;
            $operatorOrValue = "=";
        }

        $index = count($this->wheres) + 1;

        $this->wheres[] = [
            'column' => $column,
            'operator' => $operatorOrValue,
            'value' => $value,
            'index' => $index
        ];

        return $this;
    }

    public function limit(int $limit)
    {
        $this->limit = $limit;

        return $this;
    }

    private function getWhereQuery()
    {
        $query = "";
        if(count($this->wheres) > 0) {
            $query .= " WHERE ";
            $query .= implode(' AND ', array_map(function($where) {
                return '`' . $where['column'] . '` ' . $where['operator'] . ' :' . $where['column'] . $where['index'];
            }, $this->wheres));
        }

        return $query;
    }

    private function getLimitQuery()
    {
        $query = "";
        if($this->limit > 0) {
            $query .= " LIMIT " . $this->limit;
        }

        return $query;
    }

    private function getWhereParams()
    {
        $params = [];
        foreach($this->wheres as $where) {
            if(is_string($where['value'])) {
                $params[$where['column'] . $where['index']] = $where['value'];
            } else {
                $params[$where['column'] . $where['index']] = $where['value'][0];
            }
        }

        return $params;
    }

    public function getParams()
    {
        $params = [];
        $params = array_merge($params, $this->getWhereParams());

        return $params;
    }

    public function getInsertQuery(array $params)
    {
        $query = "INSERT INTO `" . $this->tableName . "` (" . implode(', ', array_map(function($key) { return '`' . $key . '`'; }, array_keys($params))) . ") VALUES (" . implode(', ', array_map(function($key) {
            return ':' . $key;
        }, array_keys($params))) . ")";

        return $query;
    }

    public function getDeleteQuery()
    {
        $query = "DELETE FROM `" . $this->tableName . "`";
        $query .= $this->getWhereQuery();
        $query .= $this->getLimitQuery();

        return $query;
    }

    public function getUpdateQuery(array $params)
    {
        $query = "UPDATE `" . $this->tableName . "` SET ";
        $query .= implode(', ', array_map(function($key) {
            return '`' . $key . '` = :' . $key;
        }, array_keys($params)));
        $query .= $this->getWhereQuery();
        $query .= $this->getLimitQuery();

        return $query;
    }

    public function getSelectQuery()
    {
        $query = "SELECT ";
        $query .= count($this->selects) > 0 ? implode(', ', array_map(function($value) { 
            return '`' . $value . '`'; 
        }, $this->selects)) : '*';
        $query .= " FROM `" . $this->tableName . "`";
        $query .= $this->getWhereQuery();
        $query .= $this->getLimitQuery();

        return $query;
    }
}