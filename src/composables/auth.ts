import { router } from '../router'

export const auth = ref({ token: '', user: { id: 0, rank: 1, name: '', ticket: '' } })

export const logout = () => {
    auth.value = {
        token: '',
        user: { id: 0, rank: 1, name: '', ticket: '' },
    }
    localStorage.clear()
    router.push('/')
}

export const checkAuth = async () => {
    const token = localStorage.getItem('token')

    if (token) {
        auth.value.token = token

        auth.value.user = await useFetchAPI<{ id: number; rank: number; name: string; ticket: string }>('UserData')
    } else {
        router.push('/')
    }
}
