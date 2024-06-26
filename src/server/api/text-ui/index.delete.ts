export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 14) {
    throw createError({ statusCode: 400, message: 'Permission requis' })
  }

  const ids = await readBody<{ id: string }[]>(event)

  for (const { id } of ids) {
    if (!id) {
      throw createError({ statusCode: 400, message: 'Un champ est manquant' })
    }

    if (isValidString(id) === false) {
      throw createError({ statusCode: 400, message: 'Un champ est incorrect' })
    }
  }

  const { urlAssets } = useRuntimeConfig().public

  const data = await fetchServer<Record<string, string>>(urlAssets + 'gamedata-sandbox/UITexts.json');

  for (const { id } of ids) {
    if (data[id] === undefined) {
      continue
    }

    delete data[id]
  }

  const uploadData = [{
      'action': 'upload',
      'path': 'gamedata-sandbox/UITexts.json',
      'data': Buffer.from(JSON.stringify(data)).toString('base64'),
  }]

  if (await uploadApi('assets', uploadData) === false) {
    throw createError({ statusCode: 400, message: 'Problème lors de l\'importation' })
  }

  await logSandboxDao.create({
    method: 'delete',
    editName: 'text-ui',
    editKey: ids.map(x => x.id).join(', '),
    user: {
      connect: { id: sessionUser.id }
    }
  })

  return null
})
