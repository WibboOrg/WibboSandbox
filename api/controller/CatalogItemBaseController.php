<?php
class CatalogItemBaseController extends BaseController
{
    public array $minRank = ['GET' => 13, 'POST' => 13, 'DELETE' => 13, 'PATCH' => 13];
    
    public function get() 
    {
        $id = $_GET["id"] ?? null;

        if (is_numeric($id))
            return CatalogItemBaseDto::getAllByPageId($id);

        return CatalogItemBaseDto::getAll();
    }

    public function patch()
    {
        $data = $this->getData(['id', 'item_name', 'width', 'length', 'stack_height', 'can_stack', 'can_sit', 'is_walkable', 'interaction_type', 'interaction_modes_count', 'vending_ids', 'height_adjustable', 'effect_id']);

        CatalogItemBaseDto::update(
            (int)$data['id'],
            $data['item_name'],
            (int) $data['width'],
            (int) $data['length'],
            (int) $data['stack_height'],
            (int) $data['can_stack'],
            (int) $data['can_sit'],
            (int) $data['is_walkable'],
            $data['interaction_type'],
            (int) $data['interaction_modes_count'],
            (int) $data['vending_ids'],
            $data['height_adjustable'],
            (int) $data['effect_id']
        );
        LogSandboxDto::create($this->user['id'], 'patch', 'catalog_item_base', $data['id']);
    }

    public function delete()
    {
        $data = $this->getData(['id']);

        CatalogItemBaseDto::delete((int)$data['id']);
        LogSandboxDto::create($this->user['id'], 'delete', 'catalog_item_base', $data['id']);
    }

    public function post()
    {
        $data = $this->getData(['item_name', 'width', 'length', 'stack_height', 'can_stack', 'can_sit', 'is_walkable', 'interaction_type', 'interaction_modes_count', 'vending_ids', 'height_adjustable', 'effect_id']);

        $id = CatalogItemBaseDto::create(
            $data['item_name'],
            (int) $data['width'],
            (int) $data['length'],
            (int) $data['stack_height'],
            (int) $data['can_stack'],
            (int) $data['can_sit'],
            (int) $data['is_walkable'],
            $data['interaction_type'],
            (int) $data['interaction_modes_count'],
            (int) $data['vending_ids'],
            $data['height_adjustable'],
            (int) $data['effect_id']
        );

        LogSandboxDto::create($this->user['id'], 'post', 'catalog_item_base', $id);

        return CatalogItemBaseDto::getOne($id);
    }
}