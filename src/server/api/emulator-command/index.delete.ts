export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 11) {
    throw createError({
        statusCode: 400,
        message: 'Permission requis'
    })
  }

  const { id } = await readBody<{ id?: number }>(event)

  if (!id) {
    throw createError({ statusCode: 400, message: 'Un champ est manquant' })
  }

  if (isValidNumber(id) === false) {
    throw createError({ statusCode: 400, message: 'Un champ est incorrect' })
  }

  const emulatorComandDao = useEmulatorCommandDao()

  await emulatorComandDao.remove(id)

  return null
})