export default defineNuxtRouteMiddleware((to, from) => {
    const { authUser } = useAuth()

    if (to.path !== '/' && !authUser.value) return '/'
    if (to.path === '/' && authUser.value) return '/home'
})