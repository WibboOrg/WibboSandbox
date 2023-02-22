<template>
    <transition
        enter-active-class="duration-300"
        enter-from-class="-translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="duration-300"
        leave-from-class="translate-x-0"
        leave-to-class="-translate-x-full"
    >
        <nav
            class="absolute top-0 bottom-0 left-0 z-10 flex flex-col h-full gap-1 p-2 bg-gray-800 shadow shadow-gray-600 w-[200px] overflow-y-auto"
            v-show="$route.path !== '/hotel'"
            :key="$route.path !== '/hotel' ? 'yes' : 'no'"
        >
            <div class="flex justify-between mb-2">
                <span class="font-bold">SandBox</span>

                <div class="flex gap-1 items-center">
                    <div class="cursor-pointer" @click="logout()">
                        <IconLogout class="w-4 h-4" />
                    </div>
                </div>
            </div>
            <div v-for="cate in categoryList.filter((x) => x.minRank <= auth.user.rank)" :key="cate.category">
                <div class="border-b-2 mb-2">{{ cate.text }}</div>
                <ul class="flex flex-col gap-1">
                    <li
                        :class="{ 'bg-gray-600': nav.path === $route.path }"
                        class="w-full px-4 rounded transition-colors cursor-pointer hover:bg-gray-600"
                        @click="$router.push(nav.path)"
                        v-for="(nav, index) of navList.filter((x) => x.category === cate.category)"
                        :key="index"
                    >
                        {{ nav.text }}
                    </li>
                </ul>
            </div>
        </nav>
    </transition>
</template>

<script lang="ts" setup>
const categoryList = ref<{ category: string; text: string; minRank: number }[]>([])
const navList = ref<{ category: string; text: string; path: string }[]>([])

categoryList.value.push({ category: 'upload', text: 'Importer', minRank: 11 })
categoryList.value.push({ category: 'text', text: 'Texte', minRank: 11 })
categoryList.value.push({ category: 'emulator', text: 'Emulateur', minRank: 11 })
categoryList.value.push({ category: 'catalog', text: 'Catalogue', minRank: 11 })
categoryList.value.push({ category: 'asset', text: 'Asset', minRank: 11 })
categoryList.value.push({ category: 'user', text: 'Utilisateur', minRank: 11 })
categoryList.value.push({ category: 'nitro', text: 'Nitro', minRank: 11 })
categoryList.value.push({ category: 'tool', text: 'Outil', minRank: 11 })
categoryList.value.push({ category: 'log', text: 'Log', minRank: 11 })

navList.value.push({ category: 'tool', text: 'Régénérer', path: '/tool-regen' })

navList.value.push({ category: 'nitro', text: 'Crée', path: '/nitro-create' })
navList.value.push({ category: 'nitro', text: 'Extraire', path: '/nitro-extract' })
navList.value.push({ category: 'nitro', text: 'Renommer', path: '/nitro-rename' })
navList.value.push({ category: 'nitro', text: 'Aperçu', path: '/nitro-preview' })

navList.value.push({ category: 'upload', text: 'Mobilier', path: '/upload-furni' })
navList.value.push({ category: 'upload', text: 'Badge', path: '/upload-badge' })
navList.value.push({ category: 'upload', text: 'Effet', path: '/upload-effect' })
navList.value.push({ category: 'upload', text: 'Vêtement', path: '/upload-clothe' })
navList.value.push({ category: 'upload', text: 'Animal', path: '/upload-pet' })

navList.value.push({ category: 'text', text: 'Mobilier', path: '/text-furni' })
navList.value.push({ category: 'text', text: 'Badge', path: '/text-badge' })
navList.value.push({ category: 'text', text: 'External Nitro', path: '/text-external' })
navList.value.push({ category: 'text', text: 'UI Nitro', path: '/text-ui' })

navList.value.push({ category: 'emulator', text: 'Texte', path: '/emulator-text' })
navList.value.push({ category: 'emulator', text: 'Command', path: '/emulator-command' })

navList.value.push({ category: 'catalog', text: 'Page', path: '/catalog-page' })
navList.value.push({ category: 'catalog', text: 'Objet', path: '/catalog-item' })
navList.value.push({ category: 'catalog', text: 'Objet limitée', path: '/catalog-item-limited' })
navList.value.push({ category: 'catalog', text: 'Objet config', path: '/catalog-item-base' })

navList.value.push({ category: 'asset', text: 'Badge', path: '/asset-badge' })
navList.value.push({ category: 'asset', text: 'Article', path: '/asset-article' })
navList.value.push({ category: 'asset', text: 'Mobilier', path: '/asset-furni' })
navList.value.push({ category: 'asset', text: 'Catalogue', path: '/asset-catalog' })
navList.value.push({ category: 'asset', text: 'Navigateur', path: '/asset-navigator' })
navList.value.push({ category: 'asset', text: 'Reception', path: '/asset-reception' })
navList.value.push({ category: 'asset', text: 'Web promo', path: '/asset-webpromosmall' })
navList.value.push({ category: 'asset', text: 'Background', path: '/asset-background' })
navList.value.push({ category: 'asset', text: 'Upload', path: '/asset-upload' })
navList.value.push({ category: 'asset', text: 'Son', path: '/asset-sound' })
navList.value.push({ category: 'asset', text: 'Thumbnail', path: '/asset-thumbnail' })
navList.value.push({ category: 'asset', text: 'Mp3', path: '/asset-mp3' })
navList.value.push({ category: 'asset', text: 'Page', path: '/asset-page' })
navList.value.push({ category: 'asset', text: 'Notification', path: '/asset-notification' })
navList.value.push({ category: 'asset', text: 'Icon', path: '/asset-icon' })

navList.value.push({ category: 'user', text: 'Compte', path: '/user-account' })

navList.value.push({ category: 'log', text: 'Sandbox', path: '/log-sandbox' })
</script>
