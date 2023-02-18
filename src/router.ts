import { createRouter, createWebHashHistory } from 'vue-router'

const pages = import.meta.glob('./pages/**/*.vue')

const routes = Object.keys(pages).map((path) => {
    const pageName = path.match(/Page(.*)\.vue$/)

    if (!pageName || pageName.length === 0) throw new Error('Page incorrect: ' + path)

    const pageNameSplit = pageName[1].match(/[A-Z0-9][a-z0-9]+/g)

    if (!pageNameSplit || pageNameSplit.length === 0) throw new Error('Page incorrect: ' + path)

    const categoryName = pageNameSplit[0].toLowerCase()
    const pathName = categoryName === 'index' ? '' : pageNameSplit.join('-').toLowerCase()

    return {
        path: pathName === 'not-found' ? '/:pathMatch(.*)*' : '/' + pathName,
        component: pages[path],
        meta: { title: categoryName },
    }
})

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.afterEach((to) => (document.title = 'Sandbox: ' + getConfig<string>('title.' + to.meta.title) ?? 'Page introuvable'))

router.beforeEach(async (to) => {
    await loadConfig()
    await checkAuth()

    if (to.path !== '/' && auth.value.token === '') return '/'
    if (to.path === '/' && auth.value.token !== '') return '/home'
})
