import type { user } from '@prisma/client'

declare module 'h3' {
    interface H3EventContext {
        user?: user
    }
}

export {}
