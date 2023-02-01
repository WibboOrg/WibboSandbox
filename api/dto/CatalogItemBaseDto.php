<?php 
class CatalogItemBaseDto extends BaseDto
{
    public static ?BaseModel $model = null;
    public static string $modelName = "item_base";

    public static function getAll()
    {
        $model = self::getModel();

        return $model->select('id', 'item_name', 'width', 'length', 'stack_height', 'can_stack', 'can_sit', 'is_walkable', 'interaction_type', 'interaction_modes_count', 'vending_ids', 'height_adjustable', 'effect_id')
            ->get();
    }

    public static function getAllByPageId(int $pageId)
    {
        $model = self::getModel();

        $stmt = $model->execute('SELECT id, item_name, width, length, stack_height, can_stack, can_sit, is_walkable, interaction_type, interaction_modes_count, vending_ids, height_adjustable, effect_id FROM item_base WHERE id IN (SELECT item_id FROM catalog_item WHERE page_id = :pageId)', ['pageId' => $pageId]);
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
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