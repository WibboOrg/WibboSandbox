<?php
class CatalogItemBaseController extends BaseController
{
    public array $minRank = ['GET' => 11, 'POST' => 12, 'DELETE' => 12, 'PATCH' => 12];
    
    public function get(Request $request) 
    {
        $id = $_GET["id"] ?? null;

        if (is_numeric($id))
            return ItemBaseDto::getAllByPageId($id);

        return ItemBaseDto::getAll();
    }

    public function patch(Request $request)
    {
        $dataInt = $request->getNumber(['id', 'sprite_id', 'width', 'length', 'stack_height', 'interaction_modes_count', 'vending_ids', 'effect_id']);
        $dataBool = $request->getBoolean(['can_stack', 'can_sit', 'is_walkable']);
        $dataStr = $request->getString(['type', 'item_name', 'interaction_type', 'height_adjustable']);

        ItemBaseDto::update(
            $dataInt['id'],
            $dataInt['sprite_id'],
            $dataStr['type'],
            $dataStr['item_name'],
            $dataInt['width'],
            $dataInt['length'],
            $dataInt['stack_height'],
            $dataBool['can_stack'],
            $dataBool['can_sit'],
            $dataBool['is_walkable'],
            $dataStr['interaction_type'],
            $dataInt['interaction_modes_count'],
            $dataInt['vending_ids'],
            $dataStr['height_adjustable'],
            $dataInt['effect_id']
        );
        LogSandboxDto::create($this->user['id'], 'patch', 'catalog_item_base', $dataInt['id']);
    }

    public function delete(Request $request)
    {
        $dataInt = $request->getNumber(['id']);

        ItemBaseDto::delete($dataInt['id']);
        LogSandboxDto::create($this->user['id'], 'delete', 'catalog_item_base', $dataInt['id']);
    }

    public function post(Request $request)
    {
        $dataInt = $request->getNumber(['sprite_id', 'width', 'length', 'stack_height', 'interaction_modes_count', 'vending_ids', 'effect_id']);
        $dataBool = $request->getBoolean(['can_stack', 'can_sit', 'is_walkable']);
        $dataStr = $request->getString(['type', 'item_name', 'interaction_type', 'height_adjustable']);

        $id = ItemBaseDto::create(
            $dataInt['sprite_id'],
            $dataStr['type'],
            $dataStr['item_name'],
            $dataInt['width'],
            $dataInt['length'],
            $dataInt['stack_height'],
            $dataBool['can_stack'],
            $dataBool['can_sit'],
            $dataBool['is_walkable'],
            $dataStr['interaction_type'],
            $dataInt['interaction_modes_count'],
            $dataInt['vending_ids'],
            $dataStr['height_adjustable'],
            $dataInt['effect_id']
        );

        LogSandboxDto::create($this->user['id'], 'post', 'catalog_item_base', $id);

        return ItemBaseDto::getOne($id);
    }
}