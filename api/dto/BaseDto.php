<?php
class BaseDto 
{
    public static ?BaseModel $model = null;

    public static function getModel(string $modelName): BaseModel
    {
        if (is_null(self::$model))
        {
            self::$model = new BaseModel($modelName);
        }
        return self::$model;
    }
}