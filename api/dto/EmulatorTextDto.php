<?php 
class EmulatorTextDto extends BaseDto
{
    public static ?BaseModel $model = null;
    public static string $modelName = "emulator_text";

    public static function create()
    {
        $model = self::getModel();

        
    }
}