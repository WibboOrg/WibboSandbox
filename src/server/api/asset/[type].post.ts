export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 11) {
    throw createError({ statusCode: 400, message: 'Permission requis' })
  }

  const { file } = await readBody<{ file: { base64: string, name: string } }>(event)

  if (isValidField(file, file?.base64) === false) {
    throw createError({ statusCode: 400, message: 'Fichier introuvable' })
  }

  const category = event.context.params?.type || ''

  const categoryAndPath = getCategoryAndPath(category);

  if (!categoryAndPath) {
    throw createError({ statusCode: 400, message: 'Categorie introuvable' })
  }

  const { path, categoryType, ext } = categoryAndPath

  const fullPath = path + '/' + ((ext === '') ? 'custom/sandbox_' + Math.floor(Date.now() / 1000) : file.name);
    
  const uploadData = [{
    'action': 'upload',
    'path': fullPath,
    'data': file.base64
  }]

  if (await uploadApi(categoryType === 'assets' ? 'assets' : 'cdn', uploadData) === false) {
    throw createError({ statusCode: 400, message: 'Problème lors de l\'importation' })
  }

  const logSandboxDao = useLogSandboxDao()
  logSandboxDao.create({
    method: 'post',
    editName: 'asset',
    editKey: file.name,
    timestampCreated: Math.floor(Date.now() / 1000),
    user: {
      connect: { id: sessionUser.id }
    }
  })

  const config = useRuntimeConfig()

  const startUrl = categoryType === 'assets' ? config.urlAssets : config.urlCdn;

  return { id: fullPath, link: startUrl + fullPath };
})