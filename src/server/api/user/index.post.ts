import { EmulatorCommand } from "@prisma/client"

export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 11) {
    throw createError({ statusCode: 400, message: 'Permission requis' })
  }

  const { input, minrank, description_fr } = await readBody<Partial<EmulatorCommand>>(event)

  if (!input || !minrank || !description_fr) {
    throw createError({ statusCode: 400, message: 'Un champ est manquant' })
  }

  if (isValidNumber(minrank) === false || isValidString(input, description_fr) === false ) {
    throw createError({ statusCode: 400, message: 'Un champ est incorrect' })
  }

  const emulatorComandDao = useEmulatorCommandDao()

  return emulatorComandDao.create({ input, minrank, description_fr })
})