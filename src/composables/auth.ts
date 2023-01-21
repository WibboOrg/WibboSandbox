import { router } from '../router'

export const auth = ref({ token: '' })

export const logout = () => {
    auth.value = {
        token: '',
    }

    localStorage.clear()

    router.push('/')
}

export const checkAuth = async () => {
    const token = localStorage.getItem('token')

    if (token) {
        auth.value.token = token
    } else {
        router.push('/')
    }
}
