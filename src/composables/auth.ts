import type { UserData } from '~/types'

export const useAuthUser = () => useState<UserData | null>('user', () => null)
export const useTokenJwt = () => useCookie<string | null>('token-jwt')

export const useAuth = () => {
  const authUser = useAuthUser()
  const tokenJwt = useTokenJwt()

  const setUser = (user: UserData | null) => {
    authUser.value = user
  }

  const setTokenJwt = (token: string | null) => {
    tokenJwt.value = token
  }

  const login = async (name: string, password: string, rememberMe: boolean): Promise<boolean> => {
    const token = await $fetch('/auth/login', { body: { name, password, rememberMe }, method: 'post' })

    setTokenJwt(token)

    await nextTick(async () => await me())

    return true
  }

  const logout = async () => {
    try {
      setUser(null)
      setTokenJwt(null)
      navigateTo('/')
    } catch (e: unknown) {
      console.error(e)
    }
  }

  const me = async () => {
    try {
      if (!authUser.value) {
        const user = await $fetch('/auth/me')

        setUser(user)
      }
    } catch (e: unknown) {
      console.error(e)
    }
  }

  return {
    login,
    logout,
    me,
    authUser,
    tokenJwt
  }
}
