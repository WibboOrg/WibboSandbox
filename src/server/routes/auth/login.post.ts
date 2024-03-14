import { createToken } from "~/server/utils/session";

export default defineEventHandler(async (event) => {
    const { name, password, rememberMe } = await readBody<{ name: string; password: string; rememberMe: boolean }>(event)

    if (!name || !password) {
        throw createError({ statusCode: 400, message: 'Permission requis' })
    }

    const userWithPassword = await userDao.getOneByName(name)

    if (!userWithPassword) {
        throw createError({ statusCode: 400, message: 'Ce compte n\'existe pas' })
    }

    if (userWithPassword.password === '') {
        const hashPassword = await hash(password)

        await userDao.update(userWithPassword.id, { password: hashPassword })
    } else {
        const verified = await verify(password, userWithPassword.password)

        if (!verified) {
            throw createError({ statusCode: 400, message: 'Identifiants incorrects' })
        }
    }

    const { tokenSecret, tokenRememberMeExpires, tokenExpires } = useRuntimeConfig()

    const session = { userId: userWithPassword.id }
    const signedSession = await createToken(session, tokenSecret, rememberMe ? tokenRememberMeExpires : tokenExpires)

    return signedSession
})
