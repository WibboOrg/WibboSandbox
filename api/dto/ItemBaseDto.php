<?php 
class ItemBaseDto extends BaseDto
{
    public static ?BaseModel $model = null;
    public static string $modelName = "item_base";

    public static function getAll()
    {
        $model = self::getModel();

        return $model->select('item_base.id', 'item_base.sprite_id', 'item_base.type', 'item_base.item_name', 'item_base.width', 'item_base.length', 
            'item_base.stack_height', 'item_base.can_stack', 'item_base.can_sit', 'item_base.is_walkable', 'item_base.interaction_type',
            'item_base.interaction_modes_count', 'item_base.vending_ids', 'item_base.height_adjustable', 'item_base.effect_id')
            ->select(['catalog_item.page_id', 'page_id'])
            ->join('LEFT', 'catalog_item', '`catalog_item`.`item_id` = `item_base`.`id`')    
            ->get();
    }
    
    public static function getOne(int $id)
    {
        $model = self::getModel();

        return $model->select('item_base.id', 'item_base.sprite_id', 'item_base.type', 'item_base.item_name', 'item_base.width', 'item_base.length', 
            'item_base.stack_height', 'item_base.can_stack', 'item_base.can_sit', 'item_base.is_walkable', 'item_base.interaction_type',
            'item_base.interaction_modes_count', 'item_base.vending_ids', 'item_base.height_adjustable', 'item_base.effect_id')
            ->select(['catalog_item.page_id', 'page_id'])
            ->join('LEFT', 'catalog_item', '`catalog_item`.`item_id` = `item_base`.`id`')    
            ->where('id', $id)    
            ->first();
    }

    public static function create(int $spriteId, string $type, string $itemName, int $width, int $length, float $stackHeight, int $canStack, int $canSit, int $isWalkable,
    string $interactionType, int $interactionModesCount, int $vendingIds, string $heightAdjustable, int $effectId)
    {
        $model = self::getModel();

        $model->insert([
            'sprite_id' => $spriteId,
            'type' => $type,
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

    public static function update(int $id, int $spriteId, string $type, string $itemName, int $width, int $length, float $stackHeight, int $canStack, int $canSit, int $isWalkable,
     string $interactionType, int $interactionModesCount, int $vendingIds, string $heightAdjustable, int $effectId)
    {
        $model = self::getModel();

        $model->where('id', $id)
            ->update([
                'sprite_id' => $spriteId,
                'type' => $type,
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

    public static function getOneByIdOrName(int $id, string $name)
    {
        $model = self::getModel();

        return $model->select('id')->where('id', $id)->orWhere('sprite_id', $id)->orWhere('item_name', $name)->first();
    }

    public static function getLastId()
    {
        $model = self::getModel();

        $query = $model->select('id')->orderBy("id", "DESC")->first();

        return $query['id'];
    }
}