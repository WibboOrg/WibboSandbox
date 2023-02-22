<?php
class QueryBuilder
{
    private string $tableName;
    private array $selects;
    private array $joins;
    private array $wheres;
    private array $orWheres;
    private array $order;
    private int $limit;

    public function __construct()
    {
        $this->tableName = '';
        $this->reset();
    }

    public function reset()
    {
        $this->selects = [];
        $this->wheres = [];
        $this->joins = [];
        $this->orWheres = [];
        $this->order = [];
        $this->limit = 0;
    }

    public function from(string $tableName)
    {
        $this->tableName = $tableName;
        
        return $this;
    }

    public function select(string | array ...$selects)
    {
        foreach ($selects as $select) {
            $firstValue = is_string($select) ? $select : $select[0];
            $firstValue = str_contains($firstValue, '.') ? explode('.', $firstValue) : $firstValue;
            $as = is_array($select) ? ' AS ' . $select[1] : null;
            $tableName = is_array($firstValue) ? $firstValue[0] . '.' : null;
            $column = is_array($firstValue) ? $firstValue[1] : $firstValue;

            $this->selects[] = [
                'column' => $column,
                'as' => $as,
                'tableName' => $tableName
            ];
        }

        return $this;
    }

    public function orWhere(string $column, string $operatorOrValue, $value = null, $tableName = null)
    {
        if($value === null)
        {
            $value  = $operatorOrValue;
            $operatorOrValue = "=";
        }

        $index = count($this->wheres) + count($this->orWheres) + 1;

        $this->orWheres[] = [
            'table' => $tableName ? $tableName : $this->tableName,
            'column' => $column,
            'operator' => $operatorOrValue,
            'value' => $value,
            'index' => $index
        ];

        return $this;
    }

    public function where(string $column, string $operatorOrValue, $value = null, $tableName = null)
    {
        if($value === null)
        {
            $value = $operatorOrValue;
            $operatorOrValue = "=";
        }

        $index = count($this->wheres) + count($this->orWheres) + 1;

        $this->wheres[] = [
            'table' => $tableName ? $tableName : $this->tableName,
            'column' => $column,
            'operator' => $operatorOrValue,
            'value' => $value,
            'index' => $index
        ];

        return $this;
    }

    public function join(string $type, string $tableName, string $on)
    {
        $this->joins[] = ["type" => $type, "table" => $tableName, "on" => $on];

        return $this;
    }

    public function limit(int $limit)
    {
        $this->limit = $limit;

        return $this;
    }

    public function orderBy(string $column, string $order)
    {
        $this->order[] = ["column" => $column, "order" => $order];

        return $this;
    }

    private function getWhereQuery(): string
    {
        $query = "";
        if(count($this->wheres) > 0 || count($this->orWheres) > 0) {
            $query .= " WHERE ";

            $query .= implode(' AND ', array_map(function ($where) {
                return $where['table'] . '.`'. $where['column'] . '` ' . $where['operator'] . ' :' . $where['column'] . $where['index'];
            }, $this->wheres));

            if(count($this->orWheres) > 0 && count($this->wheres) > 0) {
                $query .= " OR ";
            }

            $query .= implode(' OR ', array_map(function($where) {
                return $where['table'] . '.`' . $where['column'] . '` ' . $where['operator'] . ' :' . $where['column'] . $where['index'];
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

    private function getJoinQuery(): string
    {
        $query = "";
        if(count($this->joins) > 0) {
            $query .= ' ';
            $query .= implode(' , ', array_map(function ($join) {
                return '' . $join['type'] . ' JOIN `' . $join['table'] . '` ON ' . $join['on'];
            }, $this->joins));
        }

        return $query;
    }

    private function getOrderQuery(): string
    {
        $query = "";
        if(count($this->order) > 0) {
            $query .= " ORDER BY ";

            $query .= implode(' , ', array_map(function ($order) {
                return '`' . $order['column'] . '` ' . $order['order'];
            }, $this->order));
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
        $query .= count($this->selects) > 0 ? implode(', ', array_map(function ($value) {
            return $value['tableName'] . '`' . $value['column'] . '`' . $value['as']; 
        }, $this->selects)) : '*';
        $query .= " FROM `" . $this->tableName . "`";
        $query .= $this->getJoinQuery();
        $query .= $this->getWhereQuery();
        $query .= $this->getOrderQuery();
        $query .= $this->getLimitQuery();

        return $query;
    }
}