<?php 
class ItemBaseDto extends BaseDto
{
    private static string $modelName = "item_base";

    public static function create($furniId, $furniName, $type)
    {
        $model = self::getModel(self::$modelName);

        $model->execute(
            "INSERT INTO item_base VALUES (:furni_id, :furni_name, :type, '1', '1', '1', '0', '1', '0', :furni_id, '0', '1', '1', '1', '1', 'default', '1', '0', '0', '0', '0')",
            ['furni_id' => $furniId, 'furni_name' => $furniName, 'type' => $type]
        );
    }

    public static function getOneByIdOrName($id, $name)
    {
        $model = self::getModel(self::$modelName);

        $data = $model->select('id')->where('id', $id)->orWhere('item_name', $name)->first();

        return $data;
    }
}