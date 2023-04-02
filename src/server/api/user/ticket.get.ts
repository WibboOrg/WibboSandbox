import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const sessionUser = getSessionUser(event)

  const authTicket = `ticket-${bcrypt.genSaltSync()}-ticket`

  const userDao = useUserDao()

  await userDao.update(sessionUser.id, { auth_ticket: authTicket })

  return authTicket
})
