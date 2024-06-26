import { User } from "@wibbo/prisma"

export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 11) {
    throw createError({ statusCode: 400, message: 'Permission requis' })
  }

  const users = await readBody<User[]>(event)

  for (const { username, rank } of users) {
    if (!username || !rank) {
      throw createError({ statusCode: 400, message: 'Un champ est manquant' })
    }

    if (isValidNumber(rank) === false || isValidString(username) === false) {
      throw createError({ statusCode: 400, message: 'Un champ est incorrect' })
    }
  }

  const results: User[] = []

  for (const { username, rank } of users) {
    results.push(await userDao.create({ username, rank, password: '' }))
  }

  await logSandboxDao.create({
    method: 'post',
    editName: 'user',
    editKey: results.map(x => x.id).join(', '),
    user: {
      connect: { id: sessionUser.id }
    }
  })

  return results
})
