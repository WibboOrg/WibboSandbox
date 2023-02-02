<?php 
class EmulatorTextDto extends BaseDto
{
    public static ?BaseModel $model = null;
    public static string $modelName = "emulator_text";

    public static function getAll()
    {
        $model = self::getModel();

        return $model->select('id', 'identifiant', 'value_fr')->get();
    }
    public static function getOne(int $id)
    {
        $model = self::getModel();

        return $model->select('id', 'identifiant', 'value_fr')->where('id', $id)->first();
    }

    public static function delete(int $id)
    {
        $model = self::getModel();

        $model->where('id', $id)->delete();
    }

    public static function update(int $id, string $identifiant, string $value)
    {
        $model = self::getModel();

        $model->where('id', $id)->update(['identifiant' => $identifiant, 'value_fr' => $value]);
    }

    public static function create(string $id, string $value)
    {
        $model = self::getModel();

        $model->insert(['identifiant' => $id, 'value_fr' => $value]);

        return $model->getLastInsertId();
    }
}