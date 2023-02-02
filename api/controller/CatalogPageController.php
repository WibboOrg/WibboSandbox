<?php
class CatalogPageController extends BaseController
{
    public array $minRank = ['GET' => 13, 'POST' => 13, 'DELETE' => 13, 'PATCH' => 13];

    public function get(Request $request) 
    {
        return CatalogPageDto::getAll();
    }

    public function patch(Request $request)
    {
        $dataStr = $request->getString(['caption', 'page_layout', 'page_strings_1', 'page_strings_2']);
        $dataInt = $request->getNumber(['id', 'parent_id', 'icon_image', 'enabled', 'min_rank', 'order_num', 'is_premium']);

        CatalogPageDto::update(
            $dataInt['id'], 
            $dataInt['parent_id'],
            $dataStr['caption'],
            $dataInt['icon_image'],
            $dataInt['enabled'],
            $dataInt['min_rank'],
            $dataInt['order_num'],
            $dataStr['page_layout'],
            $dataStr['page_strings_1'],
            $dataStr['page_strings_2'],
            $dataInt['is_premium']
        );

        LogSandboxDto::create($this->user['id'], 'patch', 'catalog_page', $dataInt['id']);
    }

    public function delete(Request $request)
    {
        $dataInt = $request->getNumber(['id']);

        CatalogPageDto::delete($dataInt['id']);

        LogSandboxDto::create($this->user['id'], 'delete', 'catalog_page', $dataInt['id']);
    }

    public function post(Request $request)
    {
        $dataStr = $request->getString(['caption', 'page_layout', 'page_strings_1', 'page_strings_2']);
        $dataInt = $request->getNumber(['parent_id', 'icon_image', 'enabled', 'min_rank', 'order_num', 'is_premium']);

        $id = CatalogPageDto::create(
            $dataInt['parent_id'],
            $dataStr['caption'],
            $dataInt['icon_image'],
            $dataInt['enabled'],
            $dataInt['min_rank'],
            $dataInt['order_num'],
            $dataStr['page_layout'],
            $dataStr['page_strings_1'],
            $dataStr['page_strings_2'],
            $dataInt['is_premium']
        );

        LogSandboxDto::create($this->user['id'], 'post', 'catalog_page', $id);

        return CatalogPageDto::getOne($id);
    }
}