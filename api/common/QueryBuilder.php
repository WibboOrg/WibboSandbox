<?php
class QueryBuilder
{
    private string $tableName;

    private array $selects;
    private array $wheres;
    private array $orWheres;
    private int $limit;

    public function __construct(string $name)
    {
        $this->tableName = $name;
        $this->selects = [];
        $this->wheres = [];
        $this->orWheres = [];
        $this->limit = 0;
    }

    public function select(string ...$selects)
    {
        $this->selects = $selects;
        
        return $this;
    }

    public function orWhere(string $column, string $operatorOrValue, $value = null)
    {
        if($value === null)
        {
            $value  = $operatorOrValue;
            $operatorOrValue = "=";
        }

        $index = count($this->wheres) + count($this->orWheres) + 1;

        $this->orWheres[] = [
            'column' => $column,
            'operator' => $operatorOrValue,
            'value' => $value,
            'index' => $index
        ];

        return $this;
    }

    public function where(string $column, string $operatorOrValue, $value = null)
    {
        if($value === null)
        {
            $value  = $operatorOrValue;
            $operatorOrValue = "=";
        }

        $index = count($this->wheres) + count($this->orWheres) + 1;

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

    private function getWhereQuery(): string
    {
        $query = "";
        if(count($this->wheres) > 0 || count($this->orWheres) > 0) {
            $query .= " WHERE ";

            $query .= implode(' AND ', array_map(function ($where) {
                return '`' . $where['column'] . '` ' . $where['operator'] . ' :' . $where['column'] . $where['index'];
            }, $this->wheres));

            if(count($this->orWheres) > 0 && count($this->wheres) > 0) {
                $query .= " OR ";
            }

            $query .= implode(' OR ', array_map(function($where) {
                return '`' . $where['column'] . '` ' . $where['operator'] . ' :' . $where['column'] . $where['index'];
            }, $this->orWheres));
        }

        return $query;
    }

    private function getLimitQuery(): string
    {
        $query = "";
        if($this->limit > 0) {
            $query .= " LIMIT " . $this->limit;
        }

        return $query;
    }

    private function getWhereParams(): array
    {
        $params = [];
        foreach($this->wheres as $where) {
            if(is_string($where['value'])) {
                $params[$where['column'] . $where['index']] = $where['value'];
            } else {
                $params[$where['column'] . $where['index']] = $where['value'][0];
            }
        }

        foreach($this->orWheres as $where) {
            if(is_string($where['value'])) {
                $params[$where['column'] . $where['index']] = $where['value'];
            } else {
                $params[$where['column'] . $where['index']] = $where['value'][0];
            }
        }

        return $params;
    }

    public function getParams(): array
    {
        $params = [];
        $params = array_merge($params, $this->getWhereParams());

        return $params;
    }

    public function getInsertQuery(array $params): string
    {
        $query = "INSERT INTO `" . $this->tableName . "` (" . implode(', ', array_map(function($key) { return '`' . $key . '`'; }, array_keys($params))) . ") VALUES (" . implode(', ', array_map(function($key) {
            return ':' . $key;
        }, array_keys($params))) . ")";

        return $query;
    }

    public function getDeleteQuery(): string
    {
        $query = "DELETE FROM `" . $this->tableName . "`";
        $query .= $this->getWhereQuery();
        $query .= $this->getLimitQuery();

        return $query;
    }

    public function getUpdateQuery(array $params): string
    {
        $query = "UPDATE `" . $this->tableName . "` SET ";
        $query .= implode(', ', array_map(function($key) {
            return '`' . $key . '` = :' . $key;
        }, array_keys($params)));
        $query .= $this->getWhereQuery();
        $query .= $this->getLimitQuery();

        return $query;
    }

    public function getSelectQuery(): string
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