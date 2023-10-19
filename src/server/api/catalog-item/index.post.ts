import { CatalogItem } from "@prisma/client"

export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 11) {
    throw createError({ statusCode: 400, message: 'Permission requis' })
  }

  const { page_id, item_id, catalog_name, cost_credits, cost_pixels, cost_diamonds, cost_limitcoins, amount, offer_active, badge } = await readBody<CatalogItem>(event)

  if (isValidField(page_id, item_id, catalog_name, cost_credits, cost_pixels, cost_diamonds, cost_limitcoins, amount, offer_active, badge) === false) {
    throw createError({ statusCode: 400, message: 'Un champ est manquant' })
  }

  if (isValidNumber(page_id, item_id, cost_credits, cost_pixels, cost_diamonds, cost_limitcoins, amount) === false ||
    isValidString(catalog_name, badge) === false ||
    isValidBoolean(offer_active) === false
  ) {
    throw createError({ statusCode: 400, message: 'Un champ est incorrect' })
  }

  const catalogItemDao = useCatalogItemDao()

  return catalogItemDao.create({ page_id, item_id, catalog_name, cost_credits, cost_pixels, cost_diamonds, cost_limitcoins, amount, offer_active, badge  })
})