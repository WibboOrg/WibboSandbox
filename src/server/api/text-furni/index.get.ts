export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 11) {
    throw createError({ statusCode: 400, message: 'Permission requis' })
  }

  const { urlAssets } = useRuntimeConfig().public

  const data = await fetchServer<IFurnitureData>(urlAssets + 'gamedata-sandbox/FurnitureData.json');

  const wallItems = data.wallitemtypes.furnitype.map((value) => { return { id: value.id, classname: value.classname, name: value.name, description: value.description, type: 'i' } })
  const roomItems = data.roomitemtypes.furnitype.map((value) => { return { id: value.id, classname: value.classname, name: value.name, description: value.description, type: 's' } })

  return [...wallItems, ...roomItems]
})
