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

  const catalogItemDao = useCatalogItemDao()
  const catalogItemLimitedDao = useCatalogItemLimitedDao()

  const results: CatalogItemLimited[] = []

  for (const { catalogItemId, limitedSells, limitedStack } of catalogItemLimiteds) {
    const catalogItem = await catalogItemDao.getOne(catalogItemId)

    if (!catalogItem) {
      continue
    }

    results.push(await catalogItemLimitedDao.create({ limitedSells, limitedStack, catalogItem: { connect: { id: catalogItemId } } }))
  }


  return results
})
