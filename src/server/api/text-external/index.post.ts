export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 11) {
    throw createError({ statusCode: 400, message: 'Permission requis' })
  }

  const textExternals = await readBody<{ code: string, text: string }[]>(event)

  console.log('textExternals', textExternals)

  for (const { code, text } of textExternals) {
    if (!code || !text) {
      throw createError({ statusCode: 400, message: 'Un champ est manquant' })
    }

    if (isValidString(code, text) === false) {
      throw createError({ statusCode: 400, message: 'Un champ est incorrect' })
    }
  }

  const { urlAssets } = useRuntimeConfig().public

  const data = await fetchServer<Record<string, string>>(urlAssets + 'gamedata-sandbox/ExternalTexts.json');

  const results: { id: string, code: string, text: string }[] = []
  for (const { code, text } of textExternals) {
    if (data[code] !== undefined) {
      continue
    }

    data[code] = text
    results.push({ id: code, code, text })
  }

  const uploadData = [{
      'action': 'upload',
      'path': 'gamedata-sandbox/ExternalTexts.json',
      'data': Buffer.from(JSON.stringify(data)).toString('base64'),
  }]

  if (await uploadApi('assets', uploadData) === false) {
    throw createError({ statusCode: 400, message: 'Problème lors de l\'importation' })
  }

  await logSandboxDao.create({
    method: 'post',
    editName: 'text-external',
    editKey: textExternals.map(x => x.code).join(', '),
    user: {
      connect: { id: sessionUser.id }
    }
  })

  return results
})
