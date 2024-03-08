export default defineNuxtPlugin(async (nuxtApp) => {
    globalThis.$fetch = $fetch.create({
        onRequest({ request, options }) {
            const { tokenJwt } = useAuth()

            options.headers = (options.headers || {}) as Record<string, string>

            if (tokenJwt.value) options.headers['Authorization'] = tokenJwt.value
        },
        onResponseError({ request, options, response, error }) {
            if (!process.server) {
                const { showMessage } = useNotification()
                const { logout, authUser } = useAuth()

                const status = response.status
                const message = response._data.message ?? 'Une erreur est survenu'

                if (status === 401 && authUser !== null) {
                    logout()
                    showMessage({ message: 'Vous avez été déconnecté' })
                    throw new Error()
                }

                if (status !== 200) {
                    showMessage({ message: message })
                    throw new Error()
                }
            }
        },
    })
})
