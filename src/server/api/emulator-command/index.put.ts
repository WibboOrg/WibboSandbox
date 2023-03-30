import { EmulatorCommand } from "@prisma/client"

export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 11) {
    throw createError({
        statusCode: 400,
        message: 'Permission requis'
    })
  }

  const { id, input, minrank, description_fr } = await readBody<Partial<EmulatorCommand>>(event)

  if (!id || !input || !minrank || !description_fr) {
    throw createError({ statusCode: 400, message: 'Un champ est manquant' })
  }

  if (isValidNumber(id, minrank) === false || isValidString(input, description_fr) === false ) {
    throw createError({ statusCode: 400, message: 'Un champ est incorrect' })
  }

  const emulatorComandDao = useEmulatorCommandDao()

  emulatorComandDao.update(id, { input, minrank, description_fr })

  return null
})