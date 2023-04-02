export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 11) {
    throw createError({ statusCode: 400, message: 'Permission requis' })
  }

  const category = event.context.params?.type || ''

  const categoryAndPath = getCategoryAndPath(category);

  if (!categoryAndPath) {
    throw createError({ statusCode: 400, message: 'Categorie introuvable' })
  }

  const config = useRuntimeConfig()

  const { path, categoryType, ext } = categoryAndPath

  const date = new Date();
  const cache = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();

  const startUrl = categoryType === 'assets' ? config.urlAssets : config.urlCdn;

  const data = await $fetch<string[]>(startUrl + 'scanDirApi.php?cate=' + category + '&cache=' + cache);

  return data.map(value => { return { id: value, link: startUrl + value } })
})

const getCategoryAndPath = (category: string) => {
        let categoryType = '';
        let path = '';
        let ext = '';

        switch (category) {
            case "backgrounds":
                categoryType = 'assets';
                path = "c_images/backgrounds";
                ext = 'png';
                break;
            case "badge":
                categoryType = 'assets';
                path = "c_images/album1584";
                ext = 'gif';
                break;
            case "catalogue":
                categoryType = 'assets';
                path = "c_images/catalogue";
                ext = 'png';
                break;
            case "navigator":
                categoryType = 'assets';
                path = "c_images/navigator";
                ext = 'png';
                break;
            case "reception":
                categoryType = 'assets';
                path = "c_images/reception";
                ext = 'png';
                break;
            case "web_promo_small":
                categoryType = 'assets';
                path = "c_images/web_promo_small";
                ext = 'png';
                break;
            case "notifications":
                categoryType = 'assets';
                path = "c_images/notifications";
                ext = 'png';
                break;
            case "wibbopages":
                categoryType = 'assets';
                path = "wibbopages";
                ext = '';
                break;
            case "icons":
                categoryType = 'assets';
                path = "icons";
                ext = 'png';
                break;
            case "mp3":
                categoryType = 'assets';
                path = "mp3";
                ext = 'mp3';
                break;
            case "article":
                categoryType = 'cdn';
                path = "web-promo";
                ext = 'png';
                break;
            case "furni":
                categoryType = 'cdn';
                path = "furni";
                ext = 'png';
                break;
            case "upload":
                categoryType = 'cdn';
                path = "uploads";
                ext = 'png';
                break;
            case "sound":
                categoryType = 'cdn';
                path = "sounds";
                ext = 'mp3';
                break;
            case "thumbnail":
                categoryType = 'cdn';
                path = "thumbnails";
                ext = 'png';
            break;
            case "effect":
              categoryType = 'assets';
              path = "bundled/effect";
              ext = 'nitro';
              break;
          case "figure":
              categoryType = 'assets';
              path = "bundled/figure";
              ext = 'nitro';
              break;
          case "furniture":
              categoryType = 'assets';
              path = "bundled/furniture";
              ext = 'nitro';
              break;
          case "generic":
              categoryType = 'assets';
              path = "bundled/generic";
              ext = 'nitro';
              break;
          case "pet":
              categoryType = 'assets';
              path = "bundled/pet";
              ext = 'nitro';
              break;
            default:
                return null
        }

  return { path, categoryType, ext };
}