import { createRouter, createWebHistory } from 'vue-router'

const categoryTitle: Record<string, string> = {}
categoryTitle['upload'] = 'Importer'
categoryTitle['text'] = 'Texte'
categoryTitle['emulator'] = 'Emulateur'
categoryTitle['catalog'] = 'Catalogue'
categoryTitle['asset'] = 'Asset'
categoryTitle['user'] = 'Utilisateur'
categoryTitle['log'] = 'Log'
categoryTitle['hotel'] = 'Hôtel'
categoryTitle['index'] = 'Acceuil'

const pages = import.meta.glob('./pages/**/*.vue')

const routes = Object.keys(pages).map((path) => {
    const pageName = path.match(/Page(.*)\.vue$/)

    if (!pageName || pageName.length === 0) throw new Error('Page incorrect: ' + path)

    const pageNameSplit = pageName[1].match(/[A-Z][a-z]+/g)

    if (!pageNameSplit || pageNameSplit.length === 0) throw new Error('Page incorrect: ' + path)

    const categoryName = pageNameSplit[0].toLowerCase()
    const pathName = categoryName === 'index' ? '' : pageNameSplit.join('-').toLowerCase()

    const title = categoryTitle[categoryName] ?? 'Page introuvable'

    return {
        path: pathName === 'not-found' ? '/:pathMatch(.*)*' : '/' + pathName,
        component: pages[path],
        meta: { title },
    }
})

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.afterEach((to) => {
    document.title = 'Sandbox: ' + to.meta?.title
})
