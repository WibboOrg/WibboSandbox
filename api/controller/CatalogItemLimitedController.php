<?php
class CatalogItemLimitedController extends BaseController
{
    public array $minRank = ['GET' => 11, 'POST' => 12, 'DELETE' => 12, 'PATCH' => 12];
    
    public function get(Request $request) 
    {
        return CatalogItemLimitedDto::getAll();
    }

    public function patch(Request $request)
    {
        $dataInt = $request->getNumber(['id', 'catalog_item_id', 'limited_sells', 'limited_stack']);

        CatalogItemLimitedDto::update($dataInt['id'], $dataInt['catalog_item_id'], $dataInt['limited_sells'], $dataInt['limited_stack']);
        LogSandboxDto::create($this->user['id'], 'patch', 'catalog_item_limited', $dataInt['id']);
    }

    public function delete(Request $request)
    {
        $dataInt = $request->getNumber(['id']);

        CatalogItemLimitedDto::delete($dataInt['id']);
        LogSandboxDto::create($this->user['id'], 'delete', 'catalog_item_limited', $dataInt['id']);
    }

    public function post(Request $request)
    {
        $dataInt = $request->getNumber(['catalog_item_id', 'limited_sells', 'limited_stack']);

        $id = CatalogItemLimitedDto::create($dataInt['catalog_item_id'], $dataInt['limited_sells'], $dataInt['limited_stack']);

        LogSandboxDto::create($this->user['id'], 'post', 'catalog_item_limited', $id);

        return CatalogItemLimitedDto::getOne($id);
    }
}