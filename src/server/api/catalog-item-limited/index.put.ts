import { CatalogItemLimited } from "wibboprisma"

export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 11) {
    throw createError({ statusCode: 400, message: 'Permission requis' })
  }

  const catalogItemLimiteds = await readBody<CatalogItemLimited[]>(event)

  for (const { catalogItemId, limitedSells, limitedStack } of catalogItemLimiteds) {
    if (isValidField(catalogItemId, limitedSells, limitedStack) === false) {
      throw createError({ statusCode: 400, message: 'Un champ est manquant' })
    }

    if (isValidNumber(catalogItemId, limitedSells, limitedStack) === false) {
      throw createError({ statusCode: 400, message: 'Un champ est incorrect' })
    }
  }

  for (const { catalogItemId, limitedSells, limitedStack } of catalogItemLimiteds) {
    catalogItemLimitedDao.update(catalogItemId, { limitedSells, limitedStack })
  }

  await logSandboxDao.create({
    method: 'put',
    editName: 'catalog-item-limited',
    editKey: catalogItemLimiteds.map(x => x.catalogItemId).join(', '),
    user: {
      connect: { id: sessionUser.id }
    }
  })

  return null
})
