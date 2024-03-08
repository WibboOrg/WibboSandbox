export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 14) {
    throw createError({ statusCode: 400, message: 'Permission requis' })
  }

  const ids = await readBody<{ id: number }[]>(event)

  for (const { id } of ids) {
    if (!id) {
      throw createError({ statusCode: 400, message: 'Un champ est manquant' })
    }

    if (isValidNumber(id) === false) {
      throw createError({ statusCode: 400, message: 'Un champ est incorrect' })
    }
  }

  const catalogItemLimitedDao = useCatalogItemLimitedDao()

  await catalogItemLimitedDao.removeAll(ids.map(({ id }) => id))

  return null
})
