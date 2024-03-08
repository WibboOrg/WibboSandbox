export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 11) {
    throw createError({ statusCode: 400, message: 'Permission requis' })
  }

  const TextUIs = await readBody<{ id: string, text: string }[]>(event)

  for (const { id, text } of TextUIs) {
    if (!id || !text) {
      throw createError({ statusCode: 400, message: 'Un champ est manquant' })
    }

    if (isValidString(id, text) === false) {
      throw createError({ statusCode: 400, message: 'Un champ est incorrect' })
    }
  }

  const config = useRuntimeConfig()

  const data = await fetchServer<Record<string, string>>(config.urlAssets + 'gamedata-sandbox/UITexts.json');

  for (const { id, text } of TextUIs) {
    if (data[id] !== undefined) {
      continue
    }

    data[id] = text
  }

  const uploadData = [{
      'action': 'upload',
      'path': 'gamedata-sandbox/UITexts.json',
      'data': Buffer.from(JSON.stringify(data)).toString('base64'),
  }]

  if (await uploadApi('assets', uploadData) === false) {
    throw createError({ statusCode: 400, message: 'Problème lors de l\'importation' })
  }

  return null
})
