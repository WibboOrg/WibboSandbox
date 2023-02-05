<?php
class AssetController extends BaseController
{
    public array $minRank = ['GET' => 11, 'POST' => 12, 'DELETE' => 14];

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

    public function post(Request $request)
    {
        $file = $request->getFile();

        $category = $_GET['category'] ?? '';

        [$path, $categoryType, $ext] = $this->getCategoryAndPath($category);

        if (!$file) {
            throw new HttpException("Fichier introuvable", 400);
        }

        if ($ext !== '' && !preg_match('/^[a-z0-9_]+\.' . $ext . '$/', $file['name'])) {
            throw new HttpException('Nom du fichier ou extension incorrecte', 400);
        }

        $fullPath = $path . '/' . ($ext === '') ? 'custom/sandbox_' . time() : $file['name'];

        $uploadData = array(
            array(
                'action' => 'upload',
                'path' => $fullPath,
                'data' => $file["base64"],
            )
        );
        
        if (!Helper::uploadApi($categoryType, $uploadData)) {
            throw new HttpException('Problème lors de l\'importation', 400);
        }

        LogSandboxDto::create($this->user['id'], 'post', 'asset', $fullPath);

        $startUrl = $categoryType === 'assets' ? URL_ASSETS : URL_CDN;

        return ["id" => $fullPath, "link" => $startUrl . $fullPath];
    }

    public function delete(Request $request)
    {
        $dataStr = $request->getString(['id']);

        $category = $_GET['category'] ?? '';

        if (empty($dataStr['id']))
            throw new HttpException('Id invalide', 400);

        [$path, $categoryType] = $this->getCategoryAndPath($category);

        $fullPath = $path . '/' . basename($dataStr['id']);

        $uploadData = array(
            array(
                'action' => 'remove',
                'path' => $fullPath,
            )
        );

        if (!Helper::uploadApi($categoryType, $uploadData)) {
            throw new HttpException('Problème lors de la suppression', 400);
        }

        LogSandboxDto::create($this->user['id'], 'delete', 'asset', $fullPath);
    }

    private function getCategoryAndPath(string $category)
    {
        $categoryType = '';
        $path = '';
        $ext = '';

        switch ($category) {
            case "backgrounds":
                $categoryType = 'assets';
                $path = "c_images/backgrounds";
                $ext = 'png';
                break;
            case "badge":
                $categoryType = 'assets';
                $path = "c_images/album1584";
                $ext = 'gif';
                break;
            case "catalogue":
                $categoryType = 'assets';
                $path = "c_images/catalogue";
                $ext = 'png';
                break;
            case "navigator":
                $categoryType = 'assets';
                $path = "c_images/navigator";
                $ext = 'png';
                break;
            case "reception":
                $categoryType = 'assets';
                $path = "c_images/reception";
                $ext = 'png';
                break;
            case "web_promo_small":
                $categoryType = 'assets';
                $path = "c_images/web_promo_small";
                $ext = 'png';
                break;
            case "notifications":
                $categoryType = 'assets';
                $path = "c_images/notifications";
                $ext = 'png';
                break;
            case "wibbopages":
                $categoryType = 'assets';
                $path = "wibbopages";
                $ext = '';
                break;
            case "icons":
                $categoryType = 'assets';
                $path = "icons";
                $ext = 'png';
                break;
            case "mp3":
                $categoryType = 'assets';
                $path = "mp3";
                $ext = 'mp3';
                break;
            case "article":
                $categoryType = 'cdn';
                $path = "web-promo";
                $ext = 'png';
                break;
            case "furni":
                $categoryType = 'cdn';
                $path = "furni";
                $ext = 'png';
                break;
            case "upload":
                $categoryType = 'cdn';
                $path = "uploads";
                $ext = 'png';
                break;
            case "sound":
                $categoryType = 'cdn';
                $path = "sounds";
                $ext = 'mp3';
                break;
            case "thumbnail":
                $categoryType = 'cdn';
                $path = "thumbnails";
                $ext = 'png';
                break;
            default:
                throw new HttpException('Categorie invalide', 400);
        }

        return [$path, $categoryType, $ext];
    }
}