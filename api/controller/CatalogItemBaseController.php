<?php
class CatalogItemBaseController extends BaseController
{
    public array $minRank = ['GET' => 13, 'POST' => 13, 'DELETE' => 13, 'PATCH' => 13];
    
    public function get(Request $request) 
    {
        $id = $_GET["id"] ?? null;

        if (is_numeric($id))
            return CatalogItemBaseDto::getAllByPageId($id);

        return CatalogItemBaseDto::getAll();
    }

    public function patch(Request $request)
    {
        $dataInt = $request->getNumber(['id', 'width', 'length', 'stack_height', 'can_stack', 'can_sit', 'is_walkable', 'interaction_modes_count', 'vending_ids', 'effect_id']);
        $dataStr = $request->getString(['item_name', 'interaction_type', 'height_adjustable']);

        CatalogItemBaseDto::update(
            $dataInt['id'],
            $dataStr['item_name'],
            $dataInt['width'],
            $dataInt['length'],
            $dataInt['stack_height'],
            $dataInt['can_stack'],
            $dataInt['can_sit'],
            $dataInt['is_walkable'],
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

        CatalogItemBaseDto::delete($dataInt['id']);
        LogSandboxDto::create($this->user['id'], 'delete', 'catalog_item_base', $dataInt['id']);
    }

    public function post(Request $request)
    {
        $dataStr = $request->getString(['item_name', 'interaction_type', 'height_adjustable']);
        $dataInt = $request->getNumber(['width', 'length', 'stack_height', 'can_stack', 'can_sit', 'is_walkable', 'interaction_modes_count', 'vending_ids', 'effect_id']);

        $id = CatalogItemBaseDto::create(
            $dataStr['item_name'],
            $dataInt['width'],
            $dataInt['length'],
            $dataInt['stack_height'],
            $dataInt['can_stack'],
            $dataInt['can_sit'],
            $dataInt['is_walkable'],
            $dataStr['interaction_type'],
            $dataInt['interaction_modes_count'],
            $dataInt['vending_ids'],
            $dataStr['height_adjustable'],
            $dataInt['effect_id']
        );

        LogSandboxDto::create($this->user['id'], 'post', 'catalog_item_base', $id);

        return CatalogItemBaseDto::getOne($id);
    }
}