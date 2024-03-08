import { EmulatorText } from 'wibboprisma'

export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 11) {
    throw createError({ statusCode: 400, message: 'Permission requis' })
  }

  const emulatorTexts = await readBody<EmulatorText[]>(event)

  for (const { identifiant, valueFr } of emulatorTexts) {
    if (isValidField(identifiant, valueFr) === false) {
      throw createError({ statusCode: 400, message: 'Un champ est manquant' })
    }

    if (isValidString(identifiant, valueFr!) === false) {
      throw createError({ statusCode: 400, message: 'Un champ est incorrect' })
    }
  }

  const emulatorTextDao = useEmulatorTextDao()

  const result: EmulatorText[] = []

  for (const { identifiant, valueFr } of emulatorTexts) {
    result.push(await emulatorTextDao.create({ identifiant, valueFr }))
  }

  return result
})
