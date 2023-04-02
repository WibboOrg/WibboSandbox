import type { UserData } from '~/types'

export const useAuthUser = () => useState<UserData | null>('user', () => null)

export const useAuth = () => {
    const authUser = useAuthUser()

    const setUser = (user: UserData | null) => {
        authUser.value = user
    }

    const login = async(name: string, password: string, rememberMe: boolean) => {
        const { data: user } = await useCsrfFetch('/auth/login', { body: { name, password, rememberMe }, method: 'post' })

        setUser(user.value)
    }

    const logout = async () => {
        try {
            await useCsrfFetch('/auth/logout', { method: 'post' })

            setUser(null)
            navigateTo('/')
        } catch (e: unknown) {
            console.error(e)
        }
    }

    const me = async () => {
        try {
            if (!authUser.value) {
                const { data: user } = await useCsrfFetch('/auth/me')

                setUser(user.value)
            }
        } catch (e: unknown) {
            console.error(e)
        }
    }

    return {
        login,
        logout,
        me,
        authUser
    }
}