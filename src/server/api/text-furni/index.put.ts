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

  const config = useRuntimeConfig()

  const data = await fetchServer<IFurnitureData>(config.urlAssets + 'gamedata-sandbox/FurnitureData.json');

  for (const { id, classname, name, description, type } of furniTypes) {
    const furniTypeLine = type === 's' ? data.roomitemtypes.furnitype.find(x => x.id === id) : data.wallitemtypes.furnitype.find(x => x.id === id)
    if (furniTypeLine === undefined) {
      continue
    }

    furniTypeLine.classname = classname
    furniTypeLine.name = name
    furniTypeLine.description = description
  }

  const uploadData = [{
    'action': 'upload',
    'path': 'gamedata-sandbox/FurnitureData.json',
    'data': Buffer.from(JSON.stringify(data)).toString('base64'),
  }]

  if (await uploadApi('assets', uploadData) === false) {
    throw createError({ statusCode: 400, message: 'Problème lors de l\'importation' })
  }

  return null
})
