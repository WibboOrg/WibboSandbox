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

  await catalogItemLimitedDao.removeAll(ids.map(({ id }) => id))

  await logSandboxDao.create({
    method: 'delete',
    editName: 'catalog-item-limited',
    editKey: ids.map(x => x.id).join(', '),
    user: {
      connect: { id: sessionUser.id }
    }
  })

  return null
})
