import { CatalogItemLimited } from "@prisma/client"

export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 11) {
    throw createError({ statusCode: 400, message: 'Permission requis' })
  }

  const { catalog_item_id, limited_sells, limited_stack } = await readBody<CatalogItemLimited>(event)

  if (isValidField(catalog_item_id, limited_sells, limited_stack) === false) {
    throw createError({ statusCode: 400, message: 'Un champ est manquant' })
  }

  if (isValidNumber(catalog_item_id, limited_sells, limited_stack) === false) {
    throw createError({ statusCode: 400, message: 'Un champ est incorrect' })
  }

  const catalogItemLimitedDao = useCatalogItemLimitedDao()

  return catalogItemLimitedDao.create({ catalog_item_id, limited_sells, limited_stack })
})