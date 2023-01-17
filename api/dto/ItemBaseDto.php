<?php 
class ItemBaseDto extends BaseDto
{
    public static ?BaseModel $model = null;
    public static string $modelName = "item_base";

    public static function create(int $furniId, string $furniName, string $type)
    {
        $model = self::getModel();

        $model->execute(
            "INSERT INTO item_base VALUES (:furni_id, :furni_name, :type, '1', '1', '1', '0', '1', '0', :furni_id, '0', '1', '1', '1', '1', 'default', '1', '0', '0', '0', '0', '0')",
            ['furni_id' => $furniId, 'furni_name' => $furniName, 'type' => $type]
        );
    }

    public static function getOneByIdOrName(int $id, string $name)
    {
        $model = self::getModel();

        return $model->select('id')->where('id', $id)->orWhere('sprite_id', $id)->orWhere('item_name', $name)->first();
    }

    public static function getLastId()
    {
        $model = self::getModel();

        return $model->select('id')->orderBy("id", "DESC")->first();
    }
}