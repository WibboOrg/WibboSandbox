import { getAllUser } from '../../database/daos/user.dao'

export default defineEventHandler(async (event) => {

    const usersWithPassword = await getAllUser()

    if (!usersWithPassword) {
        return createError({
                     statusCode: 404,
                     message: "Page introuvable",
                 })
    }

    const usersWithoutPassword = usersWithPassword.map(({ password: _password, ...user }) => user)

    return usersWithoutPassword
})
