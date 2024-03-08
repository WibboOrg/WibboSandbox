import { User } from "wibboprisma"

export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  if (sessionUser.rank < 11) {
    throw createError({ statusCode: 400, message: 'Permission requis' })
  }

  const users = await readBody<User[]>(event)

  for (const { id, username, rank } of users) {
    if (!id || !username || !rank) {
      throw createError({ statusCode: 400, message: 'Un champ est manquant' })
    }

    if (isValidNumber(id, rank) === false || isValidString(username) === false) {
      throw createError({ statusCode: 400, message: 'Un champ est incorrect' })
    }
  }

  const userDao = useUserDao()

  for (const { id, username, rank } of users) {
    await userDao.update(id, { username, rank })
  }

  return null
})
