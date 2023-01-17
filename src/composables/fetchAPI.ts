export const useFetchAPI = async <T>(url: string, method = 'GET', opts?: RequestInit | undefined) => {
    const response = await fetch(getConfig('api.path') + url, {
        method,
        headers: {
            Authorization: 'Bearer ' + auth.value.token,
        },
        ...(opts && { ...opts }),
    })

    const data = await response.json()

    if (response.status === 401) {
        logout()
        showError('Vous avez été déconnecté')
        throw new Error()
    }

    if (response.status === 400 || response.status === 404) {
        showError(data.message)
        throw new Error()
    }

    if (response.status !== 200) {
        showError('Une erreur est survenue')
        throw new Error()
    }

    return data as T
}
