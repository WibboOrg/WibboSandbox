export default defineNuxtPlugin(async (nuxtApp) => {
  globalThis.$fetch = $fetch.create({
    onResponseError({ request, options, response, error }) {
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
    },
  })
})
