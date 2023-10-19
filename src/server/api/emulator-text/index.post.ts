import { EmulatorText } from "@prisma/client"

export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 11) {
    throw createError({ statusCode: 400, message: 'Permission requis' })
  }

  const { id, identifiant, value_fr } = await readBody<EmulatorText>(event)

  if (isValidField(id, identifiant, value_fr) === false) {
    throw createError({ statusCode: 400, message: 'Un champ est manquant' })
  }

  if (isValidNumber(id) === false || isValidString(identifiant, value_fr) === false) {
    throw createError({ statusCode: 400, message: 'Un champ est incorrect' })
  }

  const emulatorTextDao = useEmulatorTextDao()

  return emulatorTextDao.create({ identifiant, value_fr })
})