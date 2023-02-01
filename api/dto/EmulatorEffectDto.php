<?php 
class EmulatorEffectDto extends BaseDto
{
    public static ?BaseModel $model = null;
    public static string $modelName = "emulator_effect";

    public static function getAll()
    {
        $model = self::getModel();

        return $model->select('id', 'only_staff')->get();
    }
    public static function getOne(int $id)
    {
        $model = self::getModel();

        return $model->select('id', 'only_staff')->where('id', $id)->first();
    }

    public static function delete(int $id)
    {
        $model = self::getModel();

        $model->where('id', $id)->delete();
    }

    public static function update(int $id, bool $onlyStaff)
    {
        $model = self::getModel();

        $model->where('id', $id)->update(['only_staff' => $onlyStaff ? 1 : 0]);
    }

    public static function create(int $id, bool $onlyStaff)
    {
        $model = self::getModel();

        $model->insert(['id' => $id, 'only_staff' => $onlyStaff ? 1 : 0]);

        return $model->getLastInsertId();
    }
}