import { EmulatorText } from "wibboprisma"

export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 11) {
    throw createError({ statusCode: 400, message: 'Permission requis' })
  }

  const emulatorTexts = await readBody<EmulatorText[]>(event)

  for (const { id, identifiant, valueFr } of emulatorTexts) {
    if (isValidField(id, identifiant, valueFr) === false) {
      throw createError({ statusCode: 400, message: 'Un champ est manquant' })
    }

    if (isValidNumber(id) === false || isValidString(identifiant, valueFr!) === false) {
      throw createError({ statusCode: 400, message: 'Un champ est incorrect' })
    }
  }

  const emulatorTextDao = useEmulatorTextDao()

  for (const emulatorText of emulatorTexts) {
    await emulatorTextDao.update(emulatorText.id, emulatorText)
  }

  return null
})
