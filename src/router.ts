import { createRouter, createWebHistory } from 'vue-router'
import PageIndex from './pages/PageIndex.vue'
import PageFurnidata from './pages/PageFurnidata.vue'
import PageUploadFurni from './pages/PageUploadFurni.vue'
import PageNotFound from './pages/PageNotFound.vue'

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: PageIndex, meta: { title: 'Acceuil' } },
        { path: '/hotel', component: PageIndex, meta: { title: 'Hôtel' } },
        { path: '/upload-furni', component: PageUploadFurni, meta: { title: 'Uploader un mobilier' } },
        { path: '/furnidata', component: PageFurnidata, meta: { title: 'Furnidata' } },
        { path: '/:pathMatch(.*)*', component: PageNotFound, meta: { title: 'Page introuvable' } },
    ],
})

router.afterEach((to) => {
    document.title = 'Wibbo: ' + (to.meta?.title as string) || 'Sandbox'
})
