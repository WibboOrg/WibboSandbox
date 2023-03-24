import type { User } from "../types"

const DEFAULT_USER: User = { id: 0, rank: 1, name: '', ticket: '' }

export const useAuthUser = () => useState<User>('user', () => DEFAULT_USER)

export const useAuth = () => {
    const authUser = useAuthUser()
    const authToken = useCookie('auth-token')

    const setUser = (user: User) => {
        authUser.value = user
    }

    const setCookie = (token: string) => {
        authToken.value = token
    }

    const login = async({ address = '', signature = '', messageToken = '', username = '' }) => {
        const data = await useFetchAPI<{ token: string }>('web3', {
            body: { address, signature, message_token: messageToken, username }, method: 'POST'
        })

        setCookie(data.token)

        await nextTick()

        await me()
    }

    const logout = () => {
        setUser({ id: 0, rank: 1, name: '', ticket: '' })
        setCookie('')

        navigateTo('/')
    }

    const me = async () => {
        try {
            if (authToken.value) {
                const data = await useFetchAPI<{ id: number; rank: number; name: string; ticket: string }>('UserData')

                if (!data) {
                    throw new Error()
                }

                setUser(data)
            }
        } catch (e: unknown) {
            setCookie('')
            console.error(e)
        }
    }

    return {
        login,
        logout,
        me,
        authUser,
        authToken
    }
}