<?php 
class CatalogItemDto extends BaseDto
{
    public static ?BaseModel $model = null;
    public static string $modelName = "catalog_item";

    public static function create(int $furniId, string $furniName)
    {
        $model = self::getModel();

        $model->execute(
            "INSERT INTO catalog_item VALUES (:furni_id, '7529', :furni_id, :furni_name, '25', '0', '0', '0', '0', '1', '0', '0', '0', '')",
            ['furni_id' => $furniId, 'furni_name' => $furniName]
        );
    }
}