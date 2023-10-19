export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 11) {
    throw createError({ statusCode: 400, message: 'Permission requis' })
  }

  const config = useRuntimeConfig()

  const data = await $fetch<IFurnitureData>(config.urlAssets + 'gamedata-sandbox/FurnitureData.json');

  return [...data.wallitemtypes.furnitype, ...data.roomitemtypes.furnitype].map((value) => { return { id: value.id, classname: value.classname, name: value.name, description: value.description } })
})

interface IFurnitureData {
  wallitemtypes: {
    furnitype: IFurnitureType[]
  },
  roomitemtypes: {
    furnitype: IFurnitureType[]
  },
}

interface IFurnitureType {
  id: number
  classname: string
  name: string
  description: string
}