export default defineEventHandler(async (event) => {
    const { name, password, rememberMe } = await readBody<{ name: string; password: string; rememberMe: boolean }>(event)

    if (!name || !password) {
        throw createError({
            statusCode: 400,
            message: 'Le pseudo et le mot de passe est requis',
        })
    }

    const userDTO = useUserDao()

    const userWithPassword = await userDTO.getOneByName(name)

    if (!userWithPassword) {
        throw createError({
            statusCode: 400,
            message: 'Identifiants incorrects',
        })
    }

    if (userWithPassword.password === '') {
        const hashPassword = await hash(password)

        await userDTO.update(userWithPassword.id, { password: hashPassword })
    } else {
        const verified = await verify(password, userWithPassword.password)

        if (!verified) {
            throw createError({
                statusCode: 400,
                message: 'Identifiants incorrects',
            })
        }
    }

    const config = useRuntimeConfig()

    const session = serialize({ userId: userWithPassword.id })
    const signedSession = sign(session, config.cookieSecret)

    setCookie(event, config.cookieName, signedSession, {
        httpOnly: true,
        path: '/',
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        expires: rememberMe ? new Date(Date.now() + config.cookieRememberMeExpires) : new Date(Date.now() + config.cookieExpires),
    })

    const { password: _password, ...userWithoutPassword } = userWithPassword

    return userWithoutPassword
})
