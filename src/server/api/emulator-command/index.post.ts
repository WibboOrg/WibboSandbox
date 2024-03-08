import { EmulatorCommand } from "wibboprisma"

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

  const emulatorComandDao = useEmulatorCommandDao()

  const results: EmulatorCommand[] = []

  for (const { input, minrank, descriptionFr } of emulatorCommands) {
    results.push(await emulatorComandDao.create({ input, minrank, descriptionFr }))
  }

  return results
})
