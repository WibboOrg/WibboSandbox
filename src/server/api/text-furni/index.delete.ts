export default defineEventHandler(async (event) => {
    const sessionUser = getSessionUser(event)

    if (sessionUser.rank < 14) {
      throw createError({ statusCode: 400, message: 'Permission requis' })
    }

    const ids = await readBody<{ id: number, type: 's' | 'i' }[]>(event)

    for (const { id } of ids) {
      if (!id) {
        throw createError({ statusCode: 400, message: 'Un champ est manquant' })
      }

      if (isValidNumber(id) === false) {
        throw createError({ statusCode: 400, message: 'Un champ est incorrect' })
      }
    }

    const config = useRuntimeConfig()

    const data = await fetchServer<IFurnitureData>(config.urlAssets + 'gamedata-sandbox/FurnitureData.json');

    const deleteRoomIds = ids.filter(({ type }) => type === 's').map(({ id }) => id)
    const deleteWallIds = ids.filter(({ type }) => type === 'i').map(({ id }) => id)

    if (deleteRoomIds.length) {
        data.roomitemtypes.furnitype = data.roomitemtypes.furnitype.filter(x => deleteRoomIds.includes(x.id) === false)
    }
    if(deleteWallIds.length) {
        data.wallitemtypes.furnitype = data.wallitemtypes.furnitype.filter(x => deleteWallIds.includes(x.id) === false)
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
