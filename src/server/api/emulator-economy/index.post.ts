import { EmulatorEconomy } from '@wibbo/prisma'

export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 11) {
    throw createError({ statusCode: 400, message: 'Permission requis' })
  }

  const emulatorEconomies = await readBody<EmulatorEconomy[]>(event)

  for (const { id, averagePrice, categoryId, extraData, itemId } of emulatorEconomies) {
    if (isValidField(id, averagePrice, categoryId, extraData, itemId) === false) {
      throw createError({ statusCode: 400, message: 'Un champ est manquant' })
    }

    if (isValidNumber(id, averagePrice, categoryId, itemId) === false || isValidString(extraData!) === false) {
      throw createError({ statusCode: 400, message: 'Un champ est incorrect' })
    }
  }

  const results: EmulatorEconomy[] = []

  for (const { averagePrice, categoryId, extraData, itemId } of emulatorEconomies) {
    results.push(await emulatorEconomyDao.create({ averagePrice, categoryId, extraData, itemId }))
  }

  await logSandboxDao.create({
    method: 'put',
    editName: 'emulator-economy',
    editKey: results.map(x => x.id).join(', '),
    user: {
      connect: { id: sessionUser.id }
    }
  })

  return results
})
