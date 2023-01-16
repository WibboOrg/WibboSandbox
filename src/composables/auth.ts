import { router } from '../router'

export const auth = ref({ logged: false, token: '', ssoticket: '' })

export const logout = () => {
    auth.value = {
        logged: false,
        token: '',
        ssoticket: '',
    }

    localStorage.clear()

    router.push('/')
}

export const loadSSOTicket = async () => {
    const data = await useFetchAPI<{ ticket: string }>('client')

    auth.value.ssoticket = data.ticket
}

export const checkAuth = async () => {
    const token = localStorage.getItem('token')

    if (token) {
        auth.value.token = token

        try {
            await loadSSOTicket()

            auth.value.logged = true
        } catch (e: unknown) {
            console.log(e)
        }
    } else {
        router.push('/')
    }
}
