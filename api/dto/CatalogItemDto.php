<?php 
class CatalogItemDto extends BaseDto
{
    public static ?BaseModel $model = null;
    public static string $modelName = "catalog_item";

    public static function create(int $furniId, string $furniName)
    {
        $model = self::getModel();

        $model->insert(['id' => $furniId, 'item_id' => $furniId, 'catalog_name' => $furniName, 'page_id' => '7529']);
    }
}