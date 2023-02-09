<?php 
class ItemBaseDto extends BaseDto
{
    public static ?BaseModel $model = null;
    public static string $modelName = "item_base";

    public static function create(int $furniId, string $furniName, string $type)
    {
        $model = self::getModel();

        $model->insert(['id' => $furniId, 'sprite_id' => $furniId, 'item_name' => $furniName, 'type' => $type]);
    }

    public static function getOneByIdOrName(int $id, string $name)
    {
        $model = self::getModel();

        return $model->select('id')->where('id', $id)->orWhere('sprite_id', $id)->orWhere('item_name', $name)->first();
    }

    public static function getLastId()
    {
        $model = self::getModel();

        $query = $model->select('id')->orderBy("id", "DESC")->first();

        return $query['id'];
    }
}