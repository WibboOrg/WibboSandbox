import { getUserByName } from '../../database/daos/user.dao'

export default defineEventHandler(async (event) => {
  
    const name = event.context.params?.name ?? '';

    if (name === '') {
        return createError({
            statusMessage: 'Nom invalide',
            statusCode: 400
        })
    }

    const userWithPassword = await getUserByName(name)

    if (!userWithPassword) {
        return createError({
            statusCode: 400,
            statusMessage: "Utilisateur introuvable",
        })
    }

    const { password: _password, ...usersWithoutPassword } = userWithPassword

    return usersWithoutPassword
})
