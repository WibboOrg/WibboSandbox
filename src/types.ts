import type { User } from '@prisma/client'

export interface UserData extends Omit<User, 'password'> {

}