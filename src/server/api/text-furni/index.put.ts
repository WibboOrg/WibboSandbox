export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 11) {
    throw createError({ statusCode: 400, message: 'Permission requis' })
  }

  const furniTypes = await readBody<IFurnitureType[]>(event)

  for (const { id, classname, name, description, type } of furniTypes) {
    if (!id || !classname || !name || !description ||!type) {
      throw createError({ statusCode: 400, message: 'Un champ est manquant' })
    }

    if (isValidNumber(id) === false || isValidString(classname, name, description, type) === false) {
      throw createError({ statusCode: 400, message: 'Un champ est incorrect' })
    }
  }

  const { urlAssets } = useRuntimeConfig().public

  const data = await fetchServer<IFurnitureData>(urlAssets + 'gamedata-sandbox/FurnitureData.json');

  for (const { id, classname, name, description, type } of furniTypes) {
    const furniTypeLine = type === 's' ? data.roomitemtypes.furnitype.find(x => x.id === id && x.classname == classname) : data.wallitemtypes.furnitype.find(x => x.id === id && x.classname == classname)
    if (furniTypeLine === undefined) {
      continue
    }

    furniTypeLine.name = name
    furniTypeLine.description = description
  }

  const uploadData = [{
    'action': 'upload',
    'path': 'gamedata-sandbox/FurnitureData.json',
    'data': Buffer.from(JSON.stringify(data)).toString('base64'),
    'compressed': true
  }]

  if (await uploadApi('assets', uploadData) === false) {
    throw createError({ statusCode: 400, message: 'Problème lors de l\'importation' })
  }

  await logSandboxDao.create({
    method: 'put',
    editName: 'text-furni',
    editKey: furniTypes.map(x => x.id).join(', '),
    user: {
      connect: { id: sessionUser.id }
    }
  })

  return null
})
