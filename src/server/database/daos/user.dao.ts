import { prisma } from "../database"

export async function getAllUser() {
    const users = await prisma.user.findMany()
    
    return users
}
export async function getUserByName(username: string) {
    const user = await prisma.user.findFirst({
        where: {
            username
        }
    })

    return user
}