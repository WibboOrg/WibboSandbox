<?php 
class CatalogItemLimitedDto extends BaseDto
{
    public static ?BaseModel $model = null;
    public static string $modelName = "catalog_item_limited";

    public static function create()
    {
        $model = self::getModel();

        
    }
}