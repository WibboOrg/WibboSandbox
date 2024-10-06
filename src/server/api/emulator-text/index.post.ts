import { EmulatorText } from '@wibbo/prisma'

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

  const results: EmulatorText[] = []

  for (const { identifiant, valueFr } of emulatorTexts) {
    results.push(await emulatorTextDao.create({ identifiant, valueFr }))
  }

  await logSandboxDao.create({
    method: 'post',
    editName: 'emulator-text',
    editKey: results.map(x => x.id).join(', '),
    user: {
      connect: { id: sessionUser.id }
    }
  })

  return results
})
