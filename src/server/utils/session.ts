import { H3Event, getCookie } from 'h3'
import cookieSignature from 'cookie-signature'

export const serialize = (obj: object) => {
    const value = Buffer.from(JSON.stringify(obj), 'utf-8').toString('base64')
    const length = Buffer.byteLength(value)

    if (length > 4096) throw new Error('Session value is too long')

    return value
}

export const deserialize = <T>(value: string) => {
    return JSON.parse(Buffer.from(value, 'base64').toString('utf-8')) as T
}

export const sign = (value: string, secret: string) => {
    return cookieSignature.sign(value, secret)
}

export const unsign = (value: string, secret: string) => {
    return cookieSignature.unsign(value, secret)
}

export const getUserFromSession = async (event: H3Event) => {
    const config = useRuntimeConfig()
    const userDTO = useUserDao()

    const cookie = getCookie(event, config.cookieName)

    if (!cookie) return null

    const unsignedSession = unsign(cookie, config.cookieSecret)

    if (!unsignedSession) return null

    const session = deserialize<{ userId: number }>(unsignedSession)

    const userWithPassword = await userDTO.getOne(session.userId)

    if(!userWithPassword) return null

    const { password: _password, ...userWithoutPassword } = userWithPassword

    return userWithoutPassword
}

export const getSessionUser = (event: H3Event) => {
    const sessionUser = event.context.user

    if (!sessionUser) {
        throw createError({ statusCode: 401, message: 'Accès refuser' })
    }

    return sessionUser
}
