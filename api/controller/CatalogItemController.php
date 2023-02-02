<?php
class CatalogItemController extends BaseController
{
    public array $minRank = ['GET' => 13, 'POST' => 13, 'DELETE' => 13, 'PATCH' => 13];
    
    public function get() 
    {
        $id = $_GET["id"] ?? null;

        if (is_numeric($id))
            return CatalogItemDto::getAllByPageId($id);

        return CatalogItemDto::getAll();
    }

    public function patch()
    {
        $data = $this->getData(['id', 'page_id', 'catalog_name', 'cost_credits', 'cost_diamonds', 'cost_limitcoins', 'amount', 'offer_active', 'badge']);

        CatalogItemDto::update(
            (int)$data['id'], 
            (int)$data['page_id'],
            $data['catalog_name'],
            (int)$data['cost_credits'],
            (int)$data['cost_diamonds'],
            (int)$data['cost_limitcoins'],
            (int)$data['amount'],
            (int)$data['offer_active'],
            $data['badge']
        );
        LogSandboxDto::create($this->user['id'], 'patch', 'catalog_item', $data['id']);
    }

    public function delete()
    {
        $data = $this->getData(['id']);

        CatalogItemDto::delete((int)$data['id']);
        LogSandboxDto::create($this->user['id'], 'delete', 'catalog_item', $data['id']);
    }

    public function post()
    {
        $data = $this->getData(['page_id', 'catalog_name', 'cost_credits', 'cost_diamonds', 'cost_limitcoins', 'amount', 'offer_active', 'badge']);

        $id = CatalogItemDto::create(
            (int)$data['page_id'],
            $data['catalog_name'],
            (int)$data['cost_credits'],
            (int)$data['cost_diamonds'],
            (int)$data['cost_limitcoins'],
            (int)$data['amount'],
            (int)$data['offer_active'],
            $data['badge']
        );

        LogSandboxDto::create($this->user['id'], 'post', 'catalog_item', $id);

        return CatalogItemDto::getOne($id);
    }
}