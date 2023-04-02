export default defineEventHandler((event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 11) {
    throw createError({ statusCode: 400, message: 'Permission requis' })
  }
  
  const catalogItemLimitedDao = useCatalogItemLimitedDao()
  
  return catalogItemLimitedDao.getAll()
})
