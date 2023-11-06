import { CatalogItem } from "wibboprisma"

export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 11) {
    throw createError({ statusCode: 400, message: 'Permission requis' })
  }

  const { id, pageId, itemId, catalogName, costCredits, costPixels, costDiamonds, costLimitcoins, amount, offerActive, badge } = await readBody<CatalogItem>(event)

  if (isValidField(id, pageId, itemId, catalogName, costCredits, costPixels, costDiamonds, costLimitcoins, amount, offerActive, badge) === false) {
    throw createError({ statusCode: 400, message: 'Un champ est manquant' })
  }

  if (isValidNumber(id, pageId, itemId, costCredits, costPixels, costDiamonds, costLimitcoins, amount) === false ||
    isValidString(catalogName, badge) === false ||
    isValidBoolean(offerActive) === false
  ) {
    throw createError({ statusCode: 400, message: 'Un champ est incorrect' })
  }

  const catalogItemDao = useCatalogItemDao()

  catalogItemDao.update(id, { pageId, itemId, catalogName, costCredits, costPixels, costDiamonds, costLimitcoins, amount, offerActive, badge })

  return null
})