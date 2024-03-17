export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 11) {
    throw createError({ statusCode: 400, message: 'Permission requis' })
  }

  const category: CategoryKey | undefined = event.context.params?.type as CategoryKey ?? undefined

  if (!category) {
    throw createError({ statusCode: 400, message: 'Categorie introuvable' })
  }

  const categoryAndPath = uploadCategoryPath[category] ?? undefined;

  if (!categoryAndPath) {
    throw createError({ statusCode: 400, message: 'Categorie introuvable' })
  }

  const { urlAssets, urlCdn } = useRuntimeConfig().public

  const { categoryType } = categoryAndPath

  const date = new Date();
  const cache = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();

  const startUrl = categoryType === 'assets' ? urlAssets : urlCdn;

  const data = await fetchServer<string[]>(startUrl + 'scanDirApi.php?cate=' + category + '&cache=' + cache);

  return data.map(value => { return { id: value, link: startUrl + value } })
})

