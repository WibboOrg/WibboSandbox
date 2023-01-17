<?php
class BaseDto 
{
    public static function getModel(string $tableName): BaseModel
    {
        $model = new BaseModel();
        return $model->from($tableName);
    }
}