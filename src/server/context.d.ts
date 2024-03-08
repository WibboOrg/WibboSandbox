import type { User } from 'wibboprisma'

type UserWithoutPassword = Omit<User, 'password'>

declare module 'h3' {
    interface H3EventContext {
        user?: UserWithoutPassword
    }
}

export {}
