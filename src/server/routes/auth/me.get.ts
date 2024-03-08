export default defineEventHandler(async (event) => {
    const userWithoutPassword = event.context.user

    if (!userWithoutPassword) {
        return null
    }

    return userWithoutPassword
})
