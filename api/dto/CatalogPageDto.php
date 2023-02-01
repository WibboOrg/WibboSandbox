<?php 
class CatalogPageDto extends BaseDto
{
    public static ?BaseModel $model = null;
    public static string $modelName = "catalog_page";

    public static function getAll() 
    {
        $model = self::getModel();

        return $model->select('id', 'parent_id', 'caption', 'icon_image', 'enabled', 'min_rank', 'order_num', 'page_layout', 'page_strings_1', 'page_strings_2', 'is_premium')->get();
    }
    public static function getOne(int $id) 
    {
        $model = self::getModel();

        return $model->
            select('id', 'parent_id', 'caption', 'icon_image', 'enabled', 'min_rank', 'order_num', 'page_layout', 'page_strings_1', 'page_strings_2', 'is_premium')
            ->where('id', $id)
            ->first();
    }

    public static function create()
    {
        $model = self::getModel();

    }

    public static function delete(int $id)
    {
        $model = self::getModel();

        $model->where('id', $id)->delete();
    }
}