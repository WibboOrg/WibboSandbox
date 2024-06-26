import { CatalogItem } from "@wibbo/prisma"

export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 11) {
    throw createError({ statusCode: 400, message: 'Permission requis' })
  }

  const catalogItems = await readBody<CatalogItem[]>(event)

  for (const { id, pageId, itemId, catalogName, costCredits, costPixels, costDiamonds, costLimitcoins, amount, offerActive, badge } of catalogItems) {
    if (isValidField(id, pageId, itemId, catalogName, costCredits, costPixels, costDiamonds, costLimitcoins, amount, offerActive, badge) === false) {
      throw createError({ statusCode: 400, message: 'Un champ est manquant' })
    }

    if (isValidNumber(id, pageId, itemId, costCredits, costPixels, costDiamonds, costLimitcoins, amount) === false ||
      isValidString(catalogName, badge) === false ||
      isValidBoolean(offerActive) === false
    ) {
      throw createError({ statusCode: 400, message: 'Un champ est incorrect' })
    }
  }

  for (const { id, pageId, itemId, catalogName, costCredits, costPixels, costDiamonds, costLimitcoins, amount, offerActive, badge } of catalogItems) {
    await catalogItemDao.update(id, { pageId, catalogName, costCredits, costPixels, costDiamonds, costLimitcoins, amount, offerActive, badge, itemBase: { connect: { id: itemId } } })
  }

  await logSandboxDao.create({
    method: 'put',
    editName: 'catalog-item',
    editKey: catalogItems.map(x => x.id).join(', '),
    user: {
      connect: { id: sessionUser.id }
    }
  })

  return null
})
