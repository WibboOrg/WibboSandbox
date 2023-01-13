import { createRouter, createWebHistory } from 'vue-router'
import PageIndex from './pages/PageIndex.vue'
import PageFurnidata from './pages/PageFurnidata.vue'
import PageUploadFurni from './pages/PageUploadFurni.vue'

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: PageIndex },
        { path: '/upload-furni', component: PageUploadFurni },
        { path: '/furnidata', component: PageFurnidata },
    ],
})
