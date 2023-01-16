const { notifications, isError } = useNotification()

export const useFetchAPI = async <T>(url: string, method = 'GET', body: BodyInit | string | null = null) => {
    const response = await fetch(getConfig('api.path') + url, {
        method,
        headers: {
            Authorization: 'Bearer ' + auth.value.token,
        },
        body,
    })

    const data = await response.json()

    if (response.status === 401) {
        logout()
        isError.value = true
        notifications.value.push('Vous avez été déconnecté')
        throw new Error()
    }

    if (response.status === 400 || response.status === 404) {
        isError.value = true
        notifications.value.push(data.message)
        throw new Error()
    }

    if (response.status !== 200) {
        isError.value = true
        notifications.value.push('Une erreur est survenue')
        throw new Error()
    }

    return data as T
}
