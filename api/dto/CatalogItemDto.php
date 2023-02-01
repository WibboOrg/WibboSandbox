<?php 
class CatalogItemDto extends BaseDto
{
    public static ?BaseModel $model = null;
    public static string $modelName = "catalog_item";

    public static function getAll()
    {
        $model = self::getModel();

        return $model->select('id', 'page_id', 'catalog_name', 'cost_credits', 'cost_diamonds', 'cost_limitcoins', 'amount', 'offer_active', 'badge')->get();
    }

    public static function getAllByPageId(int $pageId)
    {
        $model = self::getModel();

        return $model->select('id', 'page_id', 'catalog_name', 'cost_credits', 'cost_diamonds', 'cost_limitcoins', 'amount', 'offer_active', 'badge')->where('page_id', $pageId)->get();
    }

    public static function create(int $furniId, string $furniName)
    {
        $model = self::getModel();

        $model->insert(['id' => $furniId, 'item_id' => $furniId, 'catalog_name' => $furniName, 'page_id' => '7529']);
    }

    public static function delete(int $id)
    {
        $model = self::getModel();

        $model->where('id', $id)->delete();
    }
}