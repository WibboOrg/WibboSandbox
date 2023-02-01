<?php
class CatalogPageController extends BaseController
{
    public array $minRank = ['GET' => 13, 'POST' => 13, 'DELETE' => 13, 'PATCH' => 13];

    public function get() 
    {
        return CatalogPageDto::getAll();
    }

    public function patch()
    {
        $data = $this->getData(['id', 'value_fr']);

        // CatalogPageDto::update((int)$data['id'], $data['value_fr']);

        LogSandboxDto::create($this->user['id'], 'patch', 'catalog_page', $data['id']);
    }

    public function delete()
    {
        $data = $this->getData(['id']);

        CatalogPageDto::delete((int)$data['id']);

        LogSandboxDto::create($this->user['id'], 'delete', 'catalog_page', $data['id']);
    }

    public function post()
    {
        $data = $this->getData(['identifiant', 'value_fr']);

        // $id = CatalogPageDto::create($data['identifiant'], $data['value_fr']);

        // LogSandboxDto::create($this->user['id'], 'post', 'catalog_page', $id);

        // return CatalogPageDto::getOne($id);
    }
}