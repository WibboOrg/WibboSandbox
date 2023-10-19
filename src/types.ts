import type { User } from 'wibboprisma'

export interface UserData extends Omit<User, 'password'> {

}