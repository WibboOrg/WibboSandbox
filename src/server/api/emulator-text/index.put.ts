import { EmulatorText } from "@wibbo/prisma"

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

  for (const { id, identifiant, valueFr } of emulatorTexts) {
    await emulatorTextDao.update(id, { identifiant, valueFr })
  }

  await logSandboxDao.create({
    method: 'put',
    editName: 'emulator-text',
    editKey: emulatorTexts.map(x => x.id).join(', '),
    user: {
      connect: { id: sessionUser.id }
    }
  })

  return null
})
