import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  const authTicket = `ticket-${bcrypt.genSaltSync()}-ticket`

  await userDao.update(sessionUser.id, { authTicket: authTicket })

  return authTicket
})
