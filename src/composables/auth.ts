import { ref } from 'vue'
import { fetchAPI } from './apiFetch'

export const auth = ref({ logged: false, token: '', ssoticket: '' })

export const logout = () => {
    auth.value = {
        logged: false,
        token: '',
        ssoticket: '',
    }

    localStorage.clear()
}

export const loadSSOTicket = async () => {
    const data = await fetchAPI('client')

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
    }
}
