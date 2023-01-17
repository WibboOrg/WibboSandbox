<?php 
class EmulatorCommandDto extends BaseDto
{
    public static ?BaseModel $model = null;
    public static string $modelName = "emulator_command";

    public static function create()
    {
        $model = self::getModel();

        
    }
}