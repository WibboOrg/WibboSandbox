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
        $data = $this->getData(['id', 'parent_id', 'caption', 'icon_image', 'enabled', 'min_rank', 'order_num', 'page_layout', 'page_strings_1', 'page_strings_2', 'is_premium']);

        CatalogPageDto::update(
            (int)$data['id'], 
            (int)$data['parent_id'],
            $data['caption'],
            (int)$data['icon_image'],
            (int)$data['enabled'],
            (int)$data['min_rank'],
            (int)$data['order_num'],
            $data['page_layout'],
            $data['page_strings_1'],
            $data['page_strings_2'],
            (int)$data['is_premium']
        );

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
        $data = $this->getData(['parent_id', 'caption', 'icon_image', 'enabled', 'min_rank', 'order_num', 'page_layout', 'page_strings_1', 'page_strings_2', 'is_premium']);

        $id = CatalogPageDto::create(
            (int)$data['parent_id'],
            $data['caption'],
            (int)$data['icon_image'],
            (int)$data['enabled'],
            (int)$data['min_rank'],
            (int)$data['order_num'],
            $data['page_layout'],
            $data['page_strings_1'],
            $data['page_strings_2'],
            (int)$data['is_premium']
        );

        LogSandboxDto::create($this->user['id'], 'post', 'catalog_page', $id);

        return CatalogPageDto::getOne($id);
    }
}