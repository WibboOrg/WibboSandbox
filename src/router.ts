import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: () => import('./pages/PageIndex.vue'), meta: { title: 'Acceuil' } },
        { path: '/hotel', component: () => import('./pages/PageIndex.vue'), meta: { title: 'Hôtel' } },

        { path: '/upload-furni', component: () => import('./pages/upload/PageUploadFurni.vue'), meta: { title: 'Importer' } },
        { path: '/upload-badge', component: () => import('./pages/upload/PageUploadBadge.vue'), meta: { title: 'Importer' } },
        { path: '/upload-pet', component: () => import('./pages/upload/PageUploadPet.vue'), meta: { title: 'Importer' } },
        { path: '/upload-effect', component: () => import('./pages/upload/PageUploadEffect.vue'), meta: { title: 'Importer' } },
        { path: '/upload-clothe', component: () => import('./pages/upload/PageUploadClothe.vue'), meta: { title: 'Importer' } },

        { path: '/text-furni', component: () => import('./pages/text/PageTextFurni.vue'), meta: { title: 'Texte' } },
        { path: '/text-badge', component: () => import('./pages/text/PageTextBadge.vue'), meta: { title: 'Texte' } },
        { path: '/text-external', component: () => import('./pages/text/PageTextExternal.vue'), meta: { title: 'Texte' } },
        { path: '/text-ui', component: () => import('./pages/text/PageTextUI.vue'), meta: { title: 'Texte' } },

        { path: '/emulator-text', component: () => import('./pages/emulator/PageEmulatorText.vue'), meta: { title: 'Emlulateur' } },
        { path: '/emulator-command', component: () => import('./pages/emulator/PageEmulatorCommand.vue'), meta: { title: 'Emulateur' } },

        { path: '/catalog-page', component: () => import('./pages/catalog/PageCatalogPage.vue'), meta: { title: 'Catalogue' } },
        { path: '/catalog-item', component: () => import('./pages/catalog/PageCatalogItem.vue'), meta: { title: 'Catalogue' } },
        { path: '/catalog-item-base', component: () => import('./pages/catalog/PageCatalogItemBase.vue'), meta: { title: 'Catalogue' } },
        { path: '/catalog-item-limited', component: () => import('./pages/catalog/PageCatalogItemLimited.vue'), meta: { title: 'Catalogue' } },

        { path: '/asset-badge', component: () => import('./pages/asset/PageAssetBadge.vue'), meta: { title: 'Asset' } },
        { path: '/asset-article', component: () => import('./pages/asset/PageAssetArticle.vue'), meta: { title: 'Asset' } },
        { path: '/asset-furni', component: () => import('./pages/asset/PageAssetFurni.vue'), meta: { title: 'Asset' } },
        { path: '/asset-catalogue', component: () => import('./pages/asset/PageAssetCatalog.vue'), meta: { title: 'Asset' } },
        { path: '/asset-navigator', component: () => import('./pages/asset/PageAssetNavigator.vue'), meta: { title: 'Asset' } },
        { path: '/asset-reception', component: () => import('./pages/asset/PageAssetReception.vue'), meta: { title: 'Asset' } },
        { path: '/asset-webpromosmall', component: () => import('./pages/asset/PageAssetWebpromosmall.vue'), meta: { title: 'Asset' } },
        { path: '/asset-background', component: () => import('./pages/asset/PageAssetBackground.vue'), meta: { title: 'Asset' } },
        { path: '/asset-upload', component: () => import('./pages/asset/PageAssetUpload.vue'), meta: { title: 'Asset' } },
        { path: '/asset-sound', component: () => import('./pages/asset/PageAssetSound.vue'), meta: { title: 'Asset' } },
        { path: '/asset-thumbnail', component: () => import('./pages/asset/PageAssetThumbnail.vue'), meta: { title: 'Asset' } },
        { path: '/asset-mp3', component: () => import('./pages/asset/PageAssetMp3.vue'), meta: { title: 'Asset' } },
        { path: '/asset-page', component: () => import('./pages/asset/PageAssetPage.vue'), meta: { title: 'Asset' } },
        { path: '/asset-notification', component: () => import('./pages/asset/PageAssetNotification.vue'), meta: { title: 'Asset' } },
        { path: '/asset-icon', component: () => import('./pages/asset/PageAssetIcon.vue'), meta: { title: 'Asset' } },

        { path: '/user-account', component: () => import('./pages/user/PageUserAccount.vue'), meta: { title: 'Utilisateur' } },

        { path: '/log-sandbox', component: () => import('./pages/log/PageLogSandbox.vue'), meta: { title: 'Log' } },

        { path: '/:pathMatch(.*)*', component: () => import('./pages/PageNotFound.vue'), meta: { title: 'Page introuvable' } },
    ],
})

router.afterEach((to) => {
    document.title = 'Sansbox: ' + (to.meta?.title as string) || 'Sandbox'
})
