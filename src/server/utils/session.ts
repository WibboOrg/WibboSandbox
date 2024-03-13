import { H3Event, getHeader } from 'h3'
import jwt from "jsonwebtoken"
import type { User } from '@wibbo/prisma'

export const createToken = async (session: object, tokenSecret: string, tokenExpiration: number) => {
    return jwt.sign(session, tokenSecret, { expiresIn: tokenExpiration })
}

export const verifyToken = <T>(token: string, tokenSecret: string) => {
    try {
        return jwt.verify(token, tokenSecret) as T
    } catch {
      return null
    }
}

export const getUserFromSession = async (event: H3Event) => {
    const config = useRuntimeConfig()

    const tokenJwt = getHeader(event, 'Authorization')

    if (!tokenJwt) return null

    const session = verifyToken<{ userId: number }>(tokenJwt, config.tokenSecret)

    if (!session) return null

    const userWithPassword = await userDao.getOne(session.userId)

    if(!userWithPassword) return null

    const { password: _password, ...userWithoutPassword } = userWithPassword

    return userWithoutPassword
}

export const getSessionUser = (event: H3Event) => {
    const sessionUser = event.context.user as User

    if (!sessionUser) {
        throw createError({ statusCode: 401, message: 'Accès refuser' })
    }

    return sessionUser
}
