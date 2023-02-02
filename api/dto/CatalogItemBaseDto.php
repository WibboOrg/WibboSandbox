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
    
    public static function getOne(int $id)
    {
        $model = self::getModel();

        return $model->select('id', 'item_name', 'width', 'length', 'stack_height', 'can_stack', 'can_sit', 'is_walkable', 'interaction_type', 'interaction_modes_count', 'vending_ids', 'height_adjustable', 'effect_id')
            ->where('id', $id)    
            ->first();
    }

    public static function getAllByPageId(int $pageId)
    {
        $model = self::getModel();

        $stmt = $model->execute('SELECT id, item_name, width, length, stack_height, can_stack, can_sit, is_walkable, interaction_type, interaction_modes_count, vending_ids, height_adjustable, effect_id FROM item_base WHERE id IN (SELECT item_id FROM catalog_item WHERE page_id = :pageId)', ['pageId' => $pageId]);
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function create(string $itemName, int $width, int $length, int $stackHeight, int $canStack, int $canSit, int $isWalkable,
    string $interactionType, int $interactionModesCount, int $vendingIds, string $heightAdjustable, int $effectId)
    {
        $model = self::getModel();

        $model->insert([
            'item_name' => $itemName,
            'width' => $width,
            'length' => $length,
            'stack_height' => $stackHeight,
            'can_stack' => $canStack,
            'can_sit' => $canSit,
            'is_walkable' => $isWalkable,
            'interaction_type' => $interactionType,
            'interaction_modes_count' => $interactionModesCount,
            'vending_ids' => $vendingIds,
            'height_adjustable' => $heightAdjustable,
            'effect_id' => $effectId
        ]);

        return $model->getLastInsertId();
    }

    public static function delete(int $id)
    {
        $model = self::getModel();

        $model->where('id', $id)->delete();
    }

    public static function update(int $id, string $itemName, int $width, int $length, int $stackHeight, int $canStack, int $canSit, int $isWalkable,
     string $interactionType, int $interactionModesCount, int $vendingIds, string $heightAdjustable, int $effectId)
    {
        $model = self::getModel();

        $model->where('id', $id)
            ->update([
                'item_name' => $itemName,
                'width' => $width,
                'length' => $length,
                'stack_height' => $stackHeight,
                'can_stack' => $canStack,
                'can_sit' => $canSit,
                'is_walkable' => $isWalkable,
                'interaction_type' => $interactionType,
                'interaction_modes_count' => $interactionModesCount,
                'vending_ids' => $vendingIds,
                'height_adjustable' => $heightAdjustable,
                'effect_id' => $effectId
            ]);
    }
}