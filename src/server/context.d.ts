import type { User } from 'wibboprisma'

declare module 'h3' {
    interface H3EventContext {
        user?: User
    }
}

export {}
