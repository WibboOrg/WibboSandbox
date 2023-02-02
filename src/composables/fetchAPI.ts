export const useFetchAPI = async <T>(url: string, method = 'GET', opts?: RequestInit | undefined) => {
    if (auth.value.token !== '')
        opts = {
            ...opts,
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.value.token,
            },
        }

    const response = await fetch(getConfig<string>('api.path') + url, {
        method,
        ...(opts && { ...opts }),
    })

    const data = await response.json()

    if (response.status === 401) {
        logout()
        showMessage('Vous avez été déconnecté')
        throw new Error()
    }

    if (response.status === 400 || response.status === 404) {
        showMessage(data.message)
        throw new Error()
    }

    if (response.status !== 200) {
        showMessage('Une erreur est survenue')
        throw new Error()
    }

    return data as T
}
