import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: () => import('./pages/PageIndex.vue'), meta: { title: 'Acceuil' } },
        { path: '/hotel', component: () => import('./pages/PageIndex.vue'), meta: { title: 'Hôtel' } },
        { path: '/upload-furni', component: () => import('./pages/PageUploadFurni.vue'), meta: { title: 'Uploader un mobilier' } },
        { path: '/furnidata', component: () => import('./pages/PageFurnidata.vue'), meta: { title: 'Furnidata' } },
        { path: '/badge-text', component: () => import('./pages/PageBadgeTexts.vue'), meta: { title: 'Badge Texte' } },
        { path: '/external-text', component: () => import('./pages/PageExternalTexts.vue'), meta: { title: 'External texte' } },
        { path: '/ui-text', component: () => import('./pages/PageUITexts.vue'), meta: { title: 'UI texte' } },
        { path: '/emulator-text', component: () => import('./pages/PageEmulatorText.vue'), meta: { title: 'Emlulateur texte' } },
        { path: '/emulator-command', component: () => import('./pages/PageEmulatorCommand.vue'), meta: { title: 'Emulateur command' } },
        { path: '/:pathMatch(.*)*', component: () => import('./pages/PageNotFound.vue'), meta: { title: 'Page introuvable' } },
    ],
})

router.afterEach((to) => {
    document.title = 'WibboSansbox: ' + (to.meta?.title as string) || 'Sandbox'
})
