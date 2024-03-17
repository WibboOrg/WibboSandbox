import { EmulatorCommand } from "@wibbo/prisma"

export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 11) {
    throw createError({ statusCode: 400, message: 'Permission requis' })
  }

  const emulatorCommands = await readBody<EmulatorCommand[]>(event)

  for (const { input, minrank, descriptionFr } of emulatorCommands) {
    if (!input || !minrank || !descriptionFr) {
      throw createError({ statusCode: 400, message: 'Un champ est manquant' })
    }

    if (isValidNumber(minrank) === false || isValidString(input, descriptionFr) === false) {
      throw createError({ statusCode: 400, message: 'Un champ est incorrect' })
    }
  }

  const results: EmulatorCommand[] = []

  for (const { input, minrank, descriptionFr } of emulatorCommands) {
    results.push(await emulatorCommandDao.create({ input, minrank, descriptionFr }))
  }

  await logSandboxDao.create({
    method: 'post',
    editName: 'emulator-command',
    editKey: results.map(x => x.id).join(', '),
    user: {
      connect: { id: sessionUser.id }
    }
  })


  return results
})
