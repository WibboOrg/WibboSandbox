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
        $data = $this->getData(['id', 'value_fr']);

        // CatalogItemLimitedDto::update((int)$data['id'], $data['value_fr']);
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
        $data = $this->getData(['identifiant', 'value_fr']);

        // $id = CatalogItemLimitedDto::create($data['identifiant'], $data['value_fr']);

        // LogSandboxDto::create($this->user['id'], 'post', 'catalog_item_limited', $id);

        // return CatalogItemLimitedDto::getOne($id);
    }
}