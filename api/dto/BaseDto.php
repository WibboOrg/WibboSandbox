<?php
class BaseDto 
{
    public static ?BaseModel $model = null;

    public static function getModel()
    {
        if (is_null(self::$model))
        {
            self::$model = new BaseModel();
        }
        return self::$model;
    }
}