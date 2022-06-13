<?php 
class CatalogItemDto extends BaseDto
{
    private static string $modelName = "catalog_item";

    public static function create($furniId, $furniName)
    {
        $model = self::getModel(self::$modelName);

        $model->execute(
            "INSERT INTO catalog_item VALUES (:furni_id, '7529', :furni_id, :furni_name, '25', '0', '0', '0', '1', '0', '0', '0', '')",
            ['furni_id' => $furniId, 'furni_name' => $furniName]
        );
    }
}