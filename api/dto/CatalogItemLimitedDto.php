<?php 
class CatalogItemLimitedDto extends BaseDto
{
    public static ?BaseModel $model = null;
    public static string $modelName = "catalog_item_limited";

    public static function getAll()
    {
        $model = self::getModel();

        return $model->select(['catalog_item_id', 'id'])->select('catalog_item_id', 'limited_sells', 'limited_stack')->get();
    }

    public static function create(int $furniId, int $limitedSells, int $limitedStack)
    {
        $model = self::getModel();

        $model->insert(['catalog_item_id' => $furniId, 'limited_sells' => $limitedSells, 'limited_stack' => $limitedStack]);
    }

    public static function delete(int $id)
    {
        $model = self::getModel();

        $model->where('catalog_item_id', $id)->delete();
    }
}