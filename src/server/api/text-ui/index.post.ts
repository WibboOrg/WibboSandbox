export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 11) {
    throw createError({ statusCode: 400, message: 'Permission requis' })
  }

  const textUIs = await readBody<{ code: string, text: string }[]>(event)

  for (const { code, text } of textUIs) {
    if (!code || !text) {
      throw createError({ statusCode: 400, message: 'Un champ est manquant' })
    }

    if (isValidString(code, text) === false) {
      throw createError({ statusCode: 400, message: 'Un champ est incorrect' })
    }
  }

  const { urlAssets } = useRuntimeConfig().public

  const data = await fetchServer<Record<string, string>>(urlAssets + 'gamedata-sandbox/UITexts.json');

  const results: { id: string, code: string, text: string }[] = []
  for (const { code, text } of textUIs) {
    if (data[code] !== undefined) {
      continue
    }

    data[code] = text
    results.push({ id: code, code, text })
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
    method: 'post',
    editName: 'text-ui',
    editKey: textUIs.map(x => x.code).join(', '),
    user: {
      connect: { id: sessionUser.id }
    }
  })

  return results
})
