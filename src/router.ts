import { createRouter, createWebHashHistory } from 'vue-router'

const categoryTitle: Record<string, string> = {
    upload: 'Importer',
    text: 'Texte',
    emulator: 'Emulateur',
    catalog: 'Catalogue',
    asset: 'Asset',
    user: 'Utilisateur',
    log: 'Log',
    hotel: 'Hôtel',
    index: 'Connexion',
    home: 'Acceuil',
}

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
        meta: { title: categoryTitle[categoryName] ?? 'Page introuvable' },
    }
})

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.afterEach((to) => (document.title = 'Sandbox: ' + to.meta?.title))

router.beforeEach(async (to) => {
    await loadConfig()
    await checkAuth()

    if (to.path !== '/' && auth.value.token === '') return '/'
    if (to.path === '/' && auth.value.token !== '') return '/home'
})
