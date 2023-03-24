import type { User } from '../../types'

// Fake users data
const users: User[] = [
    {
        id: 1,
        name: 'test',
        password: '123',
        rank: 11,
        ticket: 'monticket123'
    },
    {
        id: 2,
        name: 'test2',
        password: '123',
        rank: 1,
        ticket: 'monticket456'
    },
]

export async function getUsers() {
    return users
}

export async function getUserByName(name: string) {
    return users.find((user) => user.name === name)
}
export async function getUserById(id: number) {
    return users.find((user) => user.id === id)
}

export async function isAdmin(user: User) {
    return user && user.rank > 10
}
