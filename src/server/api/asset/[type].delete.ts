export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 11) {
    throw createError({ statusCode: 400, message: 'Permission requis' })
  }

  const { id } = await readBody<{ id: string }>(event)
  const category = event.context.params?.type || ''

  const categoryAndPath = getCategoryAndPath(category);

  if (!categoryAndPath) {
    throw createError({ statusCode: 400, message: 'Categorie introuvable' })
  }

  if (isValidField(id) === false) {
    throw createError({ statusCode: 400, message: 'Champ manquant' })
  }

  if (isValidString(id) === false) {
    throw createError({ statusCode: 400, message: 'Un champ est incorrect' })
  }

  const { path, categoryType, ext } = categoryAndPath

  const fullPath = path + '/' + id.split('/').reverse()[0];

  const uploadData = [{
    'action': 'remove',
    'path': fullPath,
  }]

  if (await uploadApi(categoryType === 'assets' ? 'assets' : 'cdn', uploadData) === false) {
    throw createError({ statusCode: 400, message: 'Problème lors de l\'importation' })
  }

  const logSandboxDao = useLogSandboxDao()
  logSandboxDao.create({
    method: 'delete',
    editName: 'asset',
    editKey: fullPath,
    timestampCreated: Math.floor(Date.now() / 1000),
    user: {
      connect: { id: sessionUser.id }
    }
  })
  
  return null
})
