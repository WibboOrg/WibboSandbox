<?php
class CatalogPageController extends BaseController
{
    public array $minRank = ['GET' => 11, 'POST' => 12, 'DELETE' => 12, 'PATCH' => 12];

    public function get(Request $request) 
    {
        return CatalogPageDto::getAll();
    }

    public function patch(Request $request)
    {
        $dataInt = $request->getNumber(['id', 'parent_id', 'icon_image', 'min_rank', 'order_num']);
        $dataStr = $request->getString(['caption', 'page_layout', 'page_strings_1', 'page_strings_2']);
        $dataBool = $request->getBoolean(['enabled', 'is_premium']);

        CatalogPageDto::update(
            $dataInt['id'], 
            $dataInt['parent_id'],
            $dataStr['caption'],
            $dataInt['icon_image'],
            $dataBool['enabled'],
            $dataInt['min_rank'],
            $dataInt['order_num'],
            $dataStr['page_layout'],
            $dataStr['page_strings_1'],
            $dataStr['page_strings_2'],
            $dataBool['is_premium']
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
        $dataInt = $request->getNumber(['parent_id', 'icon_image', 'min_rank', 'order_num']);
        $dataStr = $request->getString(['caption', 'page_layout', 'page_strings_1', 'page_strings_2']);
        $dataBool = $request->getBoolean(['enabled', 'is_premium']);

        $id = CatalogPageDto::create(
            $dataInt['parent_id'],
            $dataStr['caption'],
            $dataInt['icon_image'],
            $dataBool['enabled'],
            $dataInt['min_rank'],
            $dataInt['order_num'],
            $dataStr['page_layout'],
            $dataStr['page_strings_1'],
            $dataStr['page_strings_2'],
            $dataBool['is_premium']
        );

        LogSandboxDto::create($this->user['id'], 'post', 'catalog_page', $id);

        return CatalogPageDto::getOne($id);
    }
}