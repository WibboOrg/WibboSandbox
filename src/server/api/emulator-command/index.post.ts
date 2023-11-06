import { EmulatorCommand } from "wibboprisma"

export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 11) {
    throw createError({ statusCode: 400, message: 'Permission requis' })
  }

  const { input, minrank, descriptionFr } = await readBody<Partial<EmulatorCommand>>(event)

  if (!input || !minrank || !descriptionFr) {
    throw createError({ statusCode: 400, message: 'Un champ est manquant' })
  }

  if (isValidNumber(minrank) === false || isValidString(input, descriptionFr) === false ) {
    throw createError({ statusCode: 400, message: 'Un champ est incorrect' })
  }

  const emulatorComandDao = useEmulatorCommandDao()

  return emulatorComandDao.create({ input, minrank, descriptionFr })
})