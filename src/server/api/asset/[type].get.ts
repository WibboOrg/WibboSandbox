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

