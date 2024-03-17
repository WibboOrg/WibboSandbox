export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 11) {
    throw createError({ statusCode: 400, message: 'Permission requis' })
  }

  const files = await readBody<{ base64: string, name: string }[]>(event)

  for (const file of files) {
    if (isValidField(file, file?.base64) === false) {
      throw createError({ statusCode: 400, message: 'Fichier introuvable' })
    }
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

  const { path, categoryType, ext } = categoryAndPath
  const uploadDatas: UploadApiData[] = []
  const newFiles: { id: string, link: string }[] = []

  for (const file of files) {
    const startUrl = categoryType === 'assets' ? urlAssets : urlCdn;
    const fullPath = path + '/' + ((ext === '') ? 'custom/sandbox_' + Math.floor(Date.now() / 1000) : file.name);

    uploadDatas.push({
      'action': 'upload',
      'path': fullPath,
      'data': file.base64
    })

    newFiles.push({ id: fullPath, link: startUrl + fullPath })
  }

  if (await uploadApi(categoryType === 'assets' ? 'assets' : 'cdn', uploadDatas) === false) {
    throw createError({ statusCode: 400, message: 'Problème lors de l\'importation' })
  }

  await logSandboxDao.create({
    method: 'post',
    editName: categoryType + '-' + category,
    editKey: files.map(file => file.name).join(', '),
    user: {
      connect: { id: sessionUser.id }
    }
  })

  return newFiles;
})
