<?php
class CatalogItemController extends BaseController
{
    public array $minRank = ['GET' => 11, 'POST' => 12, 'DELETE' => 12, 'PATCH' => 12];
    
    public function get(Request $request) 
    {
        $id = $_GET["id"] ?? null;

        if (is_numeric($id))
            return CatalogItemDto::getAllByPageId($id);

        return CatalogItemDto::getAll();
    }

    public function patch(Request $request)
    {
        $dataInt = $request->getNumber(['id', 'page_id', 'cost_credits', 'cost_diamonds', 'cost_limitcoins', 'amount', 'offer_active']);
        $dataStr = $request->getString(['catalog_name', 'badge']);

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
        $dataInt = $request->getNumber(['page_id', 'cost_credits', 'cost_diamonds', 'cost_limitcoins', 'amount']);
        $dataStr = $request->getString(['catalog_name', 'badge']);
        $dataBool = $request->getBoolean(['offer_active']);

        $id = CatalogItemDto::create(
            $dataInt['page_id'],
            $dataStr['catalog_name'],
            $dataInt['cost_credits'],
            $dataInt['cost_diamonds'],
            $dataInt['cost_limitcoins'],
            $dataInt['amount'],
            $dataBool['offer_active'],
            $dataStr['badge']
        );

        LogSandboxDto::create($this->user['id'], 'post', 'catalog_item', $id);

        return CatalogItemDto::getOne($id);
    }
}