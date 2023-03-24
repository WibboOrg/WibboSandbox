export const useFetchAPI = async <T>(url: string, opts: Object = {}) => {
    const runtimeConfig = useRuntimeConfig()
    const { showMessage } = useNotification()
    const { logout, authToken } = useAuth()

    if (authToken.value !== '')
        opts = { ...opts, ... { headers: { Authorization: 'Bearer ' + authToken.value } } }

    return $fetch<T>(url, {
        baseURL: runtimeConfig.public.apiBase,
        onResponseError({ request, options, response, error }) {
            const status = response.status
            const message = response._data.message ?? ''

            if (status === 401) {
                logout()
                showMessage({ message: 'Vous avez été déconnecté' })
                throw new Error()
            }
        
            if (status === 400 || status === 404 || status >= 500) {
                showMessage({ message: message })
                throw new Error()
            }
        
            if (status !== 200) {
                showMessage({ message: 'Une erreur est survenue' })
                throw new Error()
            }
        },
        ...(opts && { ...opts }),
    })
}
