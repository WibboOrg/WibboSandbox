<?php 
class CatalogPageDto extends BaseDto
{
    public static ?BaseModel $model = null;
    public static string $modelName = "catalog_page";

    public static function create()
    {
        $model = self::getModel();

    }
}