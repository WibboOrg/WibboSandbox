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
        $data = $this->getData(['id', 'value_fr']);

        // CatalogItemBaseDto::update((int)$data['id'], $data['value_fr']);
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
        $data = $this->getData(['identifiant', 'value_fr']);

        // $id = CatalogItemBaseDto::create($data['identifiant'], $data['value_fr']);

        //LogSandboxDto::create($this->user['id'], 'post', 'catalog_item_base', $id);

        // return CatalogItemBaseDto::getOne($id);
    }
}