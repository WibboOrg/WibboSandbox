import { EmulatorCommand } from "@wibbo/prisma"

export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 11) {
    throw createError({ statusCode: 400, message: 'Permission requis' })
  }

  const emulatorCommands = await readBody<EmulatorCommand[]>(event)

  for (const { id, input, minrank, descriptionFr } of emulatorCommands) {
    if (!id || !input || !minrank || !descriptionFr) {
      throw createError({ statusCode: 400, message: 'Un champ est manquant' })
    }

    if (isValidNumber(id, minrank) === false || isValidString(input, descriptionFr) === false) {
      throw createError({ statusCode: 400, message: 'Un champ est incorrect' })
    }
  }

  for (const { id, input, minrank, descriptionFr } of emulatorCommands) {
    await emulatorCommandDao.update(id, { input, minrank, descriptionFr })
  }

  await logSandboxDao.create({
    method: 'put',
    editName: 'emulator-command',
    editKey: emulatorCommands.map(x => x.id).join(', '),
    user: {
      connect: { id: sessionUser.id }
    }
  })

  return null
})
