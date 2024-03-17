export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 11) {
    throw createError({ statusCode: 400, message: 'Permission requis' })
  }

  const textBadges = await readBody<{ id: string, text: string }[]>(event)

  for (const { id, text } of textBadges) {
    if (!id || !text) {
      throw createError({ statusCode: 400, message: 'Un champ est manquant' })
    }

    if (isValidString(id, text) === false) {
      throw createError({ statusCode: 400, message: 'Un champ est incorrect' })
    }
  }

  const { urlAssets } = useRuntimeConfig().public

  const data = await fetchServer<Record<string, string>>(urlAssets + 'gamedata-sandbox/BadgeTexts.json');

  for (const { id, text } of textBadges) {
    if (data[id] !== undefined) {
      continue
    }

    data[id] = text
  }

  const uploadData = [{
      'action': 'upload',
      'path': 'gamedata-sandbox/BadgeTexts.json',
      'data': Buffer.from(JSON.stringify(data)).toString('base64'),
  }]

  if (await uploadApi('assets', uploadData) === false) {
    throw createError({ statusCode: 400, message: 'Problème lors de l\'importation' })
  }

  await logSandboxDao.create({
    method: 'post',
    editName: 'text-badge',
    editKey: textBadges.map(x => x.id).join(', '),
    user: {
      connect: { id: sessionUser.id }
    }
  })

  return null
})
