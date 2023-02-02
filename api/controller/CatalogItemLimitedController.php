<?php
class CatalogItemLimitedController extends BaseController
{
    public array $minRank = ['GET' => 13, 'POST' => 13, 'DELETE' => 13, 'PATCH' => 13];
    
    public function get() 
    {
        return CatalogItemLimitedDto::getAll();
    }

    public function patch()
    {
        $data = $this->getData(['id', 'catalog_item_id', 'limited_sells', 'limited_stack']);

        CatalogItemLimitedDto::update((int)$data['id'], (int)$data['catalog_item_id'], (int)$data['limited_sells'], (int)$data['limited_stack']);
        LogSandboxDto::create($this->user['id'], 'patch', 'catalog_item_limited', $data['id']);
    }

    public function delete()
    {
        $data = $this->getData(['id']);

        CatalogItemLimitedDto::delete((int)$data['id']);
        LogSandboxDto::create($this->user['id'], 'delete', 'catalog_item_limited', $data['id']);
    }

    public function post()
    {
        $data = $this->getData(['catalog_item_id', 'limited_sells', 'limited_stack']);

        $id = CatalogItemLimitedDto::create((int)$data['catalog_item_id'], (int)$data['limited_sells'], (int)$data['limited_stack']);

        LogSandboxDto::create($this->user['id'], 'post', 'catalog_item_limited', $id);

        return CatalogItemLimitedDto::getOne($id);
    }
}