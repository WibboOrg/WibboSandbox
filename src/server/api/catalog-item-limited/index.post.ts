import { CatalogItemLimited } from "wibboprisma"

export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 11) {
    throw createError({ statusCode: 400, message: 'Permission requis' })
  }

  const { catalogItemId, limitedSells, limitedStack } = await readBody<CatalogItemLimited>(event)

  if (isValidField(catalogItemId, limitedSells, limitedStack) === false) {
    throw createError({ statusCode: 400, message: 'Un champ est manquant' })
  }

  if (isValidNumber(catalogItemId, limitedSells, limitedStack) === false) {
    throw createError({ statusCode: 400, message: 'Un champ est incorrect' })
  }

  const catalogItemDao = useCatalogItemDao()

  const catalogItem = await catalogItemDao.getOne(catalogItemId)

  if (!catalogItem) {
    throw createError({ statusCode: 400, message: 'Categorie introuvable' })
  }

  const catalogItemLimitedDao = useCatalogItemLimitedDao()

  return catalogItemLimitedDao.create({ catalogItem, limitedSells, limitedStack })
})