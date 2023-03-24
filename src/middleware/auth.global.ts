export default defineNuxtRouteMiddleware((to, from) => {
    const { authUser } = useAuth()

    if (to.path !== '/' && authUser.value.id === 0) return '/'
    if (to.path === '/' && authUser.value.id !== 0) return '/home'
})