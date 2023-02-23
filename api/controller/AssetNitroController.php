<?php
class AssetNitroController extends BaseController
{
    public array $minRank = ['GET' => 11];

    public function get(Request $request) 
    {
        $category = $_GET['category'] ?? '';

        [$path, $categoryType, $ext] = $this->getCategoryAndPath($category);

        $cache = date('j-n-Y');

        $startUrl = $categoryType === 'assets' ? URL_ASSETS : URL_CDN;

        $data = Helper::getSslPage($startUrl . 'scanDirApi.php?cate=' . $category . '&cache='. $cache . '&time=' . time(), true);

        $newData = [];

        foreach($data as $value)
            $newData[] = ["id" => $value, "link" => $startUrl . $value];

        return $newData;
    }

    private function getCategoryAndPath(string $category)
    {
        $categoryType = '';
        $path = '';
        $ext = '';

        switch ($category) {
            case "effect":
                $categoryType = 'assets';
                $path = "bundled/effect";
                $ext = 'nitro';
                break;
            case "figure":
                $categoryType = 'assets';
                $path = "bundled/figure";
                $ext = 'nitro';
                break;
            case "furniture":
                $categoryType = 'assets';
                $path = "bundled/furniture";
                $ext = 'nitro';
                break;
            case "generic":
                $categoryType = 'assets';
                $path = "bundled/generic";
                $ext = 'nitro';
                break;
            case "pet":
                $categoryType = 'assets';
                $path = "bundled/pet";
                $ext = 'nitro';
                break;
            default:
                throw new HttpException('Categorie invalide', 400);
        }

        return [$path, $categoryType, $ext];
    }
}