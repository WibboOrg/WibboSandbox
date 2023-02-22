<?php 
class CatalogItemDto extends BaseDto
{
    public static ?BaseModel $model = null;
    public static string $modelName = "catalog_item";

    public static function getAll()
    {
        $model = self::getModel();

        return $model->select('id', 'item_id', 'page_id', 'catalog_name', 'cost_credits', 'cost_diamonds', 'cost_limitcoins', 'amount', 'offer_active', 'badge')->get();
    }

    public static function getOne(int $id)
    {
        $model = self::getModel();

        return $model->select('id', 'item_id', 'page_id', 'catalog_name', 'cost_credits', 'cost_diamonds', 'cost_limitcoins', 'amount', 'offer_active', 'badge')->where('id', $id)->first();
    }

    public static function getAllByPageId(int $pageId)
    {
        $model = self::getModel();

        return $model->select('id', 'item_id', 'page_id', 'catalog_name', 'cost_credits', 'cost_diamonds', 'cost_limitcoins', 'amount', 'offer_active', 'badge')->where('page_id', $pageId)->get();
    }

    public static function getOfferId(string $id, string $type)
    {
        $model = self::getModel();

        $stmt = $model->execute("SELECT id FROM catalog_item WHERE item_id in (SELECT id FROM item_base WHERE sprite_id = :id AND type = :type) LIMIT 1", ["id" => $id, "type" => $type]);

        $query = $stmt->fetch(PDO::FETCH_ASSOC);

        return $query ? $query['id'] : 0;
    }

    public static  function getPageIdBySpriteIdAndType(int $id, string $type)
    {
        $model = self::getModel();

        $stmt = $model->execute("SELECT page_id FROM catalog_item WHERE item_id in (SELECT id FROM item_base WHERE sprite_id = :id AND type = :type) LIMIT 1", ["id" => $id, "type" => $type]);

        $query = $stmt->fetch(PDO::FETCH_ASSOC);

        return $query ? $query['page_id'] : 0;
    }

    public static function update(int $id, int $itemId, int $pageId, string $catalogName, int $costCredits, int $costDiamonds, int $costLimitcoins, int $amount, int $offerActive, string $badge)
    {
        $model = self::getModel();
        $model->where('id', $id)->update([
            'item_id' => $itemId,
            'page_id' => $pageId,
            'catalog_name' => $catalogName,
            'cost_credits' => $costCredits,
            'cost_diamonds' => $costDiamonds,
            'cost_limitcoins' => $costLimitcoins,
            'amount' => $amount,
            'offer_active' => $offerActive,
            'badge' => $badge,
        ]);
    }

    public static function create(int $itemId, int $pageId, string $catalogName, int $costCredits, int $costDiamonds, int $costLimitcoins, int $amount, int $offerActive, string $badge)
    {
        $model = self::getModel();

        $model->insert([
            'item_id' => $itemId,
            'page_id' => $pageId,
            'catalog_name' => $catalogName,
            'cost_credits' => $costCredits,
            'cost_diamonds' => $costDiamonds,
            'cost_limitcoins' => $costLimitcoins,
            'amount' => $amount,
            'offer_active' => $offerActive,
            'badge' => $badge,
        ]);

        return $model->getLastInsertId();
    }

    public static function delete(int $id)
    {
        $model = self::getModel();

        $model->where('id', $id)->delete();
    }
}