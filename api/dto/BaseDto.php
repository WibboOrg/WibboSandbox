<?php
class BaseDto 
{
    public static ?BaseModel $model = null;
    public static string $modelName = "";

    public static function getModel(): BaseModel
    {
        if(static::$model == null) static::$model =  new BaseModel();

        return static::$model->from(static::$modelName);
    }
}