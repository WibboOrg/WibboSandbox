<?php 
class EmulatorCommandDto extends BaseDto
{
    public static ?BaseModel $model = null;
    public static string $modelName = "emulator_command";

    public static function getAll()
    {
        $model = self::getModel();

        return $model->select('id', 'input', 'minrank', 'description_fr')->get();
    }

    public static function getOne(int $id)
    {
        $model = self::getModel();

        return $model->select('id', 'input', 'minrank', 'description_fr')->where('id', $id)->first();
    }

    public static function delete(int $id)
    {
        $model = self::getModel();

        $model->where('id', $id)->delete();
    }

    public static function update(int $id, int $minRank, string $description)
    {
        $model = self::getModel();

        $model->where('id', $id)->update(['minrank' => $minRank, 'description_fr' => $description]);
    }

    public static function create(string $input, int $minRank, string $description)
    {
        $model = self::getModel();

        $model->insert(['input' => $input, 'minrank' => $minRank, 'description_fr' => $description]);

        return $model->getLastInsertId();
    }
}