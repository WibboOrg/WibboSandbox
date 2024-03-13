import type { User } from '@wibbo/prisma'

export interface UserData extends Omit<User, 'password'> {

}
