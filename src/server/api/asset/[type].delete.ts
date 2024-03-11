export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 14) {
    throw createError({ statusCode: 400, message: 'Permission requis' })
  }

  const ids = await readBody<{ id: string }[]>(event)
  const category: CategoryKey | undefined = event.context.params?.type as CategoryKey ?? undefined

  if (!category) {
    throw createError({ statusCode: 400, message: 'Categorie introuvable' })
  }

  const categoryAndPath = uploadCategoryPath[category] ?? undefined;

  if (!categoryAndPath) {
    throw createError({ statusCode: 400, message: 'Categorie introuvable' })
  }

  for (const { id } of ids) {
    if (isValidField(id) === false) {
      throw createError({ statusCode: 400, message: 'Champ manquant' })
    }

    if (isValidString(id) === false) {
      throw createError({ statusCode: 400, message: 'Un champ est incorrect' })
    }
  }

  const { path, categoryType, ext } = categoryAndPath

  const uploadDatas: UploadApiData[] = []

  for(const { id } of ids) {
    uploadDatas.push({
      action: 'remove',
      path: path + '/' + id.split('/').reverse()[0],
    })
  }

  if (await uploadApi(categoryType === 'assets' ? 'assets' : 'cdn', uploadDatas) === false) {
    throw createError({ statusCode: 400, message: 'Problème lors de l\'importation' })
  }

  const logSandboxDao = useLogSandboxDao()
  logSandboxDao.create({
    method: 'delete',
    editName: 'asset',
    editKey: ids.join(', '),
    user: {
      connect: { id: sessionUser.id }
    }
  })

  return null
})
