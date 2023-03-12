<?php
class CatalogPageController extends BaseController
{
    public array $minRank = ['GET' => 11, 'POST' => 11, 'DELETE' => 12, 'PATCH' => 11];

    public function get(Request $request) 
    {
        return CatalogPageDto::getAll();
    }

    public function patch(Request $request)
    {
        $dataInt = $request->getNumber(['id', 'parent_id', 'icon_image', 'order_num']);
        $dataStr = $request->getString(['caption', 'page_layout', 'page_strings_1', 'page_strings_2', 'required_right']);
        $dataBool = $request->getBoolean(['enabled', 'is_premium']);

        if($this->user['rank'] < 12) {
            $page = CatalogPageDto::getOne($dataInt['id']);
            if($page === null) {
                throw new HttpException('Une erreur est survenu', 400);
            }

            if($page['parent_id'] !== 564674 && $page['required_right'] !== '') {
                throw new HttpException('Vous ne pouvais pas modifier cette page', 400);
            }
        }

        CatalogPageDto::update(
            $dataInt['id'], 
            $dataInt['parent_id'],
            $dataStr['caption'],
            $dataInt['icon_image'],
            $dataBool['enabled'],
            $dataStr['required_right'],
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
        $dataInt = $request->getNumber(['parent_id', 'icon_image', 'order_num']);
        $dataStr = $request->getString(['caption', 'page_layout', 'page_strings_1', 'page_strings_2', 'required_right']);
        $dataBool = $request->getBoolean(['enabled', 'is_premium']);

        $id = CatalogPageDto::create(
            $dataInt['parent_id'],
            $dataStr['caption'],
            $dataInt['icon_image'],
            $dataBool['enabled'],
            $dataStr['required_right'],
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