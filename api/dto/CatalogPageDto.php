<?php 
class CatalogPageDto extends BaseDto
{
    public static ?BaseModel $model = null;
    public static string $modelName = "catalog_page";

    public static function getAll() 
    {
        $model = self::getModel();

        return $model->select('id', 'parent_id', 'caption', 'icon_image', 'enabled', 'min_rank', 'order_num', 'page_layout', 'page_strings_1', 'page_strings_2', 'is_premium')
            ->get();
    }
    public static function getOne(int $id) 
    {
        $model = self::getModel();

        return $model->
            select('id', 'parent_id', 'caption', 'icon_image', 'enabled', 'min_rank', 'order_num', 'page_layout', 'page_strings_1', 'page_strings_2', 'is_premium')
            ->where('id', $id)
            ->first();
    }

    public static function update(int $id, int $parentId, string $caption, int $iconImage, int $enabled, int $minRank, int $orderNum, string $pageLayout, string $pageStrings1, string $pageStrings2, int $isPremium)
    {
        $model = self::getModel();

        $model->where('id', $id)->update([
            'parent_id' => $parentId, 
            'caption' => $caption, 
            'icon_image' => $iconImage, 
            'enabled' => $enabled, 
            'min_rank' => $minRank, 
            'order_num' => $orderNum, 
            'page_layout' => $pageLayout, 
            'page_strings_1' => $pageStrings1, 
            'page_strings_2' => $pageStrings2, 
            'is_premium' => $isPremium
        ]);
    }

    public static function create(int $parentId, string $caption, int $iconImage, int $enabled, int $minRank, int $orderNum, string $pageLayout, string $pageStrings1, string $pageStrings2, int $isPremium)
    {
        $model = self::getModel();

        $model->insert([
            'parent_id' => $parentId,
            'caption' => $caption,
            'icon_image' => $iconImage,
            'enabled' => $enabled,
            'min_rank' => $minRank,
            'order_num' => $orderNum,
            'page_layout' => $pageLayout,
            'page_strings_1' => $pageStrings1,
            'page_strings_2' => $pageStrings2,
            'is_premium' => $isPremium
        ]);

        return $model->getLastInsertId();
    }

    public static function delete(int $id)
    {
        $model = self::getModel();

        $model->where('id', $id)->delete();
    }
}