import { EmulatorCommand } from "wibboprisma"

export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 11) {
    throw createError({ statusCode: 400, message: 'Permission requis' })
  }

  const { id, input, minrank, descriptionFr } = await readBody<Partial<EmulatorCommand>>(event)

  if (!id || !input || !minrank || !descriptionFr) {
    throw createError({ statusCode: 400, message: 'Un champ est manquant' })
  }

  if (isValidNumber(id, minrank) === false || isValidString(input, descriptionFr) === false ) {
    throw createError({ statusCode: 400, message: 'Un champ est incorrect' })
  }

  const emulatorComandDao = useEmulatorCommandDao()

  emulatorComandDao.update(id, { input, minrank, descriptionFr })

  return null
})