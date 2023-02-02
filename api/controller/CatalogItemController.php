<?php
class CatalogItemController extends BaseController
{
    public array $minRank = ['GET' => 13, 'POST' => 13, 'DELETE' => 13, 'PATCH' => 13];
    
    public function get(Request $request) 
    {
        $id = $_GET["id"] ?? null;

        if (is_numeric($id))
            return CatalogItemDto::getAllByPageId($id);

        return CatalogItemDto::getAll();
    }

    public function patch(Request $request)
    {
        $dataStr = $request->getString(['catalog_name', 'badge']);
        $dataInt = $request->getNumber(['id', 'page_id', 'cost_credits', 'cost_diamonds', 'cost_limitcoins', 'amount', 'offer_active']);

        CatalogItemDto::update(
            $dataInt['id'], 
            $dataInt['page_id'],
            $dataStr['catalog_name'],
            $dataInt['cost_credits'],
            $dataInt['cost_diamonds'],
            $dataInt['cost_limitcoins'],
            $dataInt['amount'],
            $dataInt['offer_active'],
            $dataStr['badge']
        );
        LogSandboxDto::create($this->user['id'], 'patch', 'catalog_item', $dataInt['id']);
    }

    public function delete(Request $request)
    {
        $dataInt = $request->getNumber(['id']);

        CatalogItemDto::delete($dataInt['id']);
        LogSandboxDto::create($this->user['id'], 'delete', 'catalog_item', $dataInt['id']);
    }

    public function post(Request $request)
    {
        $dataStr = $request->getString(['catalog_name', 'badge']);
        $dataInt = $request->getNumber(['page_id', 'cost_credits', 'cost_diamonds', 'cost_limitcoins', 'amount', 'offer_active']);

        $id = CatalogItemDto::create(
            (int)$dataInt['page_id'],
            $dataStr['catalog_name'],
            (int)$dataInt['cost_credits'],
            (int)$dataInt['cost_diamonds'],
            (int)$dataInt['cost_limitcoins'],
            (int)$dataInt['amount'],
            (int)$dataInt['offer_active'],
            $dataStr['badge']
        );

        LogSandboxDto::create($this->user['id'], 'post', 'catalog_item', $id);

        return CatalogItemDto::getOne($id);
    }
}