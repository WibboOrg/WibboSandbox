<?php
class BaseDto 
{
    public static ?BaseModel $model = null;

    public static function getModel($modelName)
    {
        if (is_null(self::$model))
        {
            $className = $modelName . "Model";
            self::$model = new $className();
        }
        return self::$model;
    }
}