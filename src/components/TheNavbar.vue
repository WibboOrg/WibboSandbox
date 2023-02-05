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
                        v-for="(nav, index) of navList.filter((x) => x.category === cate.category && x.minRank <= auth.user.rank)"
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
const navList = ref<{ category: string; text: string; path: string; minRank: number }[]>([])

categoryList.value.push({ category: 'upload', text: 'Importer', minRank: 13 })
categoryList.value.push({ category: 'text', text: 'Texte', minRank: 13 })
categoryList.value.push({ category: 'emulator', text: 'Emulateur', minRank: 13 })
categoryList.value.push({ category: 'catalog', text: 'Catalogue', minRank: 13 })
categoryList.value.push({ category: 'asset', text: 'Asset', minRank: 13 })
categoryList.value.push({ category: 'user', text: 'Utilisateur', minRank: 13 })
categoryList.value.push({ category: 'log', text: 'Log', minRank: 13 })

navList.value.push({ category: 'upload', text: 'Mobilier', path: '/upload-furni', minRank: 13 })
navList.value.push({ category: 'upload', text: 'Badge', path: '/upload-badge', minRank: 13 })
navList.value.push({ category: 'upload', text: 'Effet', path: '/upload-effect', minRank: 13 })
navList.value.push({ category: 'upload', text: 'Vêtement', path: '/upload-clothe', minRank: 13 })
navList.value.push({ category: 'upload', text: 'Animal', path: '/upload-pet', minRank: 13 })

navList.value.push({ category: 'text', text: 'Mobilier', path: '/text-furni', minRank: 13 })
navList.value.push({ category: 'text', text: 'Badge', path: '/text-badge', minRank: 13 })
navList.value.push({ category: 'text', text: 'External Nitro', path: '/text-external', minRank: 13 })
navList.value.push({ category: 'text', text: 'UI Nitro', path: '/text-ui', minRank: 13 })

navList.value.push({ category: 'emulator', text: 'Texte', path: '/emulator-text', minRank: 13 })
navList.value.push({ category: 'emulator', text: 'Command', path: '/emulator-command', minRank: 13 })

navList.value.push({ category: 'catalog', text: 'Page', path: '/catalog-page', minRank: 13 })
navList.value.push({ category: 'catalog', text: 'Objet', path: '/catalog-item', minRank: 13 })
navList.value.push({ category: 'catalog', text: 'Objet limitée', path: '/catalog-item-limited', minRank: 13 })
navList.value.push({ category: 'catalog', text: 'Objet config', path: '/catalog-item-base', minRank: 13 })

navList.value.push({ category: 'asset', text: 'Badge', path: '/asset-badge', minRank: 13 })
navList.value.push({ category: 'asset', text: 'Article', path: '/asset-article', minRank: 13 })
navList.value.push({ category: 'asset', text: 'Mobilier', path: '/asset-furni', minRank: 13 })
navList.value.push({ category: 'asset', text: 'Catalogue', path: '/asset-catalog', minRank: 13 })
navList.value.push({ category: 'asset', text: 'Navigateur', path: '/asset-navigator', minRank: 13 })
navList.value.push({ category: 'asset', text: 'Reception', path: '/asset-reception', minRank: 13 })
navList.value.push({ category: 'asset', text: 'Web promo', path: '/asset-webpromosmall', minRank: 13 })
navList.value.push({ category: 'asset', text: 'Background', path: '/asset-background', minRank: 13 })
navList.value.push({ category: 'asset', text: 'Upload', path: '/asset-upload', minRank: 13 })
navList.value.push({ category: 'asset', text: 'Son', path: '/asset-sound', minRank: 13 })
navList.value.push({ category: 'asset', text: 'Thumbnail', path: '/asset-thumbnail', minRank: 13 })
navList.value.push({ category: 'asset', text: 'Mp3', path: '/asset-mp3', minRank: 13 })
navList.value.push({ category: 'asset', text: 'Page', path: '/asset-page', minRank: 13 })
navList.value.push({ category: 'asset', text: 'Notification', path: '/asset-notification', minRank: 13 })
navList.value.push({ category: 'asset', text: 'Icon', path: '/asset-icon', minRank: 13 })

navList.value.push({ category: 'user', text: 'Compte', path: '/user-account', minRank: 13 })

navList.value.push({ category: 'log', text: 'Sandbox', path: '/log-sandbox', minRank: 13 })
</script>
