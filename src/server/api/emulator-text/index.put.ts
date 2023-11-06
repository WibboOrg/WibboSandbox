import { EmulatorText } from "wibboprisma"

export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 11) {
    throw createError({ statusCode: 400, message: 'Permission requis' })
  }

  const { id, identifiant, valueFr } = await readBody<EmulatorText>(event)

  if (isValidField(id, identifiant, valueFr) === false) {
    throw createError({ statusCode: 400, message: 'Un champ est manquant' })
  }

  if (isValidNumber(id) === false || isValidString(identifiant, valueFr!) === false) {
    throw createError({ statusCode: 400, message: 'Un champ est incorrect' })
  }

  const emulatorTextDao = useEmulatorTextDao()

  emulatorTextDao.update(id, { identifiant, valueFr })

  return null
})