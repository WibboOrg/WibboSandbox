import { CatalogItem } from "wibboprisma"

export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 11) {
    throw createError({ statusCode: 400, message: 'Permission requis' })
  }

  const catalogItems = await readBody<CatalogItem[]>(event)

  for (const { pageId, itemId, catalogName, costCredits, costPixels, costDiamonds, costLimitcoins, amount, offerActive, badge } of catalogItems) {
    if (isValidField(pageId, itemId, catalogName, costCredits, costPixels, costDiamonds, costLimitcoins, amount, offerActive, badge) === false) {
      throw createError({ statusCode: 400, message: 'Un champ est manquant' })
    }

    if (isValidNumber(pageId, itemId, costCredits, costPixels, costDiamonds, costLimitcoins, amount) === false ||
      isValidString(catalogName, badge) === false ||
      isValidBoolean(offerActive) === false
    ) {
      throw createError({ statusCode: 400, message: 'Un champ est incorrect' })
    }
  }

  const catalogItemDao = useCatalogItemDao()

  const results: CatalogItem[] = []

  for (const { pageId, itemId, catalogName, costCredits, costPixels, costDiamonds, costLimitcoins, amount, offerActive, badge } of catalogItems) {
    results.push(await catalogItemDao.create({ pageId, catalogName, costCredits, costPixels, costDiamonds, costLimitcoins, amount, offerActive, badge, itemBase: { connect: { id: itemId } } }))
  }

  return results
})
