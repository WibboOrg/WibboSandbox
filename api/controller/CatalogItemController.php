<?php
class CatalogItemController extends BaseController
{
    public array $minRank = ['GET' => 11, 'POST' => 12, 'DELETE' => 12, 'PATCH' => 11];
    
    public function get(Request $request) 
    {
        return CatalogItemDto::getAll();
    }

    public function patch(Request $request)
    {
        $dataInt = $request->getNumber(['id', 'item_id', 'page_id', 'cost_credits', 'cost_diamonds', 'cost_limitcoins', 'amount', 'offer_active']);
        $dataStr = $request->getString(['catalog_name', 'badge']);

        if($this->user['rank'] < 12)
        {
            $item = CatalogItemDto::getOne($dataInt['id']);

            if($item === null) {
                throw new HttpException('Une erreur est survenu', 400);
            }

            if($item['page_id'] !== 1546145145 && $dataInt['page_id'] !== $item['page_id']) {
                throw new HttpException('Vous ne pouvais déplacer cette objet', 400);
            }

            if($dataInt['cost_limitcoins'] !== 0 || $dataInt['cost_diamonds'] !== 0) {
                throw new HttpException('Vous ne pouvais pas mettre une monnaie autre que les crédits', 400);
            }
        }

        CatalogItemDto::update(
            $dataInt['id'], 
            $dataInt['item_id'],
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
        $dataInt = $request->getNumber(['item_id', 'page_id', 'cost_credits', 'cost_diamonds', 'cost_limitcoins', 'amount']);
        $dataStr = $request->getString(['catalog_name', 'badge']);
        $dataBool = $request->getBoolean(['offer_active']);

        $id = CatalogItemDto::create(
            $dataInt['item_id'],
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