<template>
    <transition
        enterActiveClass="duration-300"
        enterFromClass="-translate-x-full"
        enterToClass="translate-x-0"
        leaveActiveClass="duration-300"
        leaveFromClass="translate-x-0"
        leaveToClass="-translate-x-full"
    >
        <nav
            class="absolute top-0 bottom-0 left-0 z-10 flex flex-col h-full gap-1 p-2 bg-gray-800 shadow shadow-gray-600 w-[200px] overflow-y-auto"
            v-show="$route.path !== '/hotel' && props.openMenu"
        >
            <div class="flex justify-between mb-2">
                <div class="flex gap-2">
                    <IconMenu class="w-6 h-6 cursor-pointer" @click="toggleSidebar" />
                    <span class="font-bold">SandBox</span>
                </div>

                <div class="flex items-center gap-1">
                    <div class="cursor-pointer" @click="logout()">
                        <IconLogout class="w-4 h-4" />
                    </div>
                </div>
            </div>
            <div v-for="cate in categoryList.filter((x) => x.minRank <= (authUser?.rank || 1))" :key="cate.category">
                <div class="flex items-center justify-between mb-2 border-b-2 cursor-pointer" @click="cate.open = !cate.open">
                    <span>{{ cate.text }}</span> <IconSortDown class="w-4 h-4 transition-transform duration-300" :class="{ '-rotate-180': cate.open }" />
                </div>
                <transition
                    enterActiveClass="duration-300 select-none"
                    enterFromClass="-translate-y-5 opacity-0"
                    enterToClass="translate-y-0 opacity-100"
                    leaveActiveClass="duration-300 select-none"
                    leaveFromClass="translate-y-0 opacity-100"
                    leaveToClass="-translate-y-5 opacity-0"
                    mode="out-in"
                >
                    <ul class="flex flex-col gap-1 overflow-hidden" v-show="cate.open">
                        <li
                            :class="{ 'bg-gray-600': nav.path === $route.path }"
                            class="w-full px-4 transition-colors rounded cursor-pointer hover:bg-gray-600"
                            @click="navigateTo(nav.path)"
                            v-for="(nav, index) of navList.filter((x) => x.category === cate.category)"
                            :key="index"
                        >
                            {{ nav.text }}
                        </li>
                    </ul>
                </transition>
            </div>
        </nav>
    </transition>
</template>

<script lang="ts" setup>
const { authUser, logout } = useAuth()

const props = defineProps({
    openMenu: { type: Boolean, default: true },
})

const emit = defineEmits(['closeSidebar'])

const categoryList = ref<{ category: string; text: string; minRank: number; open: boolean }[]>([])
const navList = ref<{ category: string; text: string; path: string }[]>([])

categoryList.value.push({ category: 'upload', text: 'Importer', minRank: 11, open: true })
categoryList.value.push({ category: 'text', text: 'Texte', minRank: 11, open: true })
categoryList.value.push({ category: 'emulator', text: 'Emulateur', minRank: 11, open: true })
categoryList.value.push({ category: 'catalog', text: 'Catalogue', minRank: 11, open: true })
categoryList.value.push({ category: 'asset', text: 'Asset', minRank: 11, open: true })
categoryList.value.push({ category: 'nitro-asset', text: 'Nitro asset', minRank: 11, open: true })
categoryList.value.push({ category: 'nitro', text: 'Nitro', minRank: 1, open: true })
categoryList.value.push({ category: 'tool', text: 'Outil', minRank: 11, open: true })
categoryList.value.push({ category: 'user', text: 'Utilisateur', minRank: 11, open: true })
categoryList.value.push({ category: 'log', text: 'Log', minRank: 11, open: true })

navList.value.push({ category: 'tool', text: 'Régénérer fichier', path: '/tool/regen' })
navList.value.push({ category: 'tool', text: 'Extraire har', path: '/tool/har' })

navList.value.push({ category: 'nitro-asset', text: 'Vêtement', path: '/nitro-asset/figure' })
navList.value.push({ category: 'nitro-asset', text: 'Effet', path: '/nitro-asset/effect' })
navList.value.push({ category: 'nitro-asset', text: 'Mobilier', path: '/nitro-asset/furniture' })
navList.value.push({ category: 'nitro-asset', text: 'Générique', path: '/nitro-asset/generic' })
navList.value.push({ category: 'nitro-asset', text: 'Animal', path: '/nitro-asset/pet' })

navList.value.push({ category: 'nitro', text: 'Crée', path: '/nitro/create' })
navList.value.push({ category: 'nitro', text: 'Extraire', path: '/nitro/extract' })
navList.value.push({ category: 'nitro', text: 'Renommer', path: '/nitro/rename' })
navList.value.push({ category: 'nitro', text: 'Aperçu', path: '/nitro/preview' })

navList.value.push({ category: 'upload', text: 'Mobilier', path: '/upload/furni' })
navList.value.push({ category: 'upload', text: 'Badge', path: '/upload/badge' })
navList.value.push({ category: 'upload', text: 'Effet', path: '/upload/effect' })
navList.value.push({ category: 'upload', text: 'Vêtement', path: '/upload/clothe' })
navList.value.push({ category: 'upload', text: 'Animal', path: '/upload/pet' })

navList.value.push({ category: 'text', text: 'Mobilier', path: '/text/furni' })
navList.value.push({ category: 'text', text: 'Badge', path: '/text/badge' })
navList.value.push({ category: 'text', text: 'External Nitro', path: '/text/external' })
navList.value.push({ category: 'text', text: 'UI Nitro', path: '/text/ui' })

navList.value.push({ category: 'emulator', text: 'Texte', path: '/emulator/text-edit' })
navList.value.push({ category: 'emulator', text: 'Command', path: '/emulator/command' })

navList.value.push({ category: 'catalog', text: 'Page', path: '/catalog/page' })
navList.value.push({ category: 'catalog', text: 'Objet', path: '/catalog/item' })
navList.value.push({ category: 'catalog', text: 'Objet limitée', path: '/catalog/item-limited' })
navList.value.push({ category: 'catalog', text: 'Objet config', path: '/catalog/item-base' })

navList.value.push({ category: 'asset', text: 'Banner', path: '/asset/banner' })
navList.value.push({ category: 'asset', text: 'Badge', path: '/asset/badge' })
navList.value.push({ category: 'asset', text: 'Article', path: '/asset/article' })
navList.value.push({ category: 'asset', text: 'Mobilier', path: '/asset/furni' })
navList.value.push({ category: 'asset', text: 'Catalogue', path: '/asset/catalog' })
navList.value.push({ category: 'asset', text: 'Navigateur', path: '/asset/navigator' })
navList.value.push({ category: 'asset', text: 'Reception', path: '/asset/reception' })
navList.value.push({ category: 'asset', text: 'Web promo', path: '/asset/webpromosmall' })
navList.value.push({ category: 'asset', text: 'Background', path: '/asset/background' })
navList.value.push({ category: 'asset', text: 'Upload', path: '/asset/upload' })
navList.value.push({ category: 'asset', text: 'Son', path: '/asset/sound' })
navList.value.push({ category: 'asset', text: 'Thumbnail', path: '/asset/thumbnail' })
navList.value.push({ category: 'asset', text: 'Mp3', path: '/asset/mp3' })
navList.value.push({ category: 'asset', text: 'Page', path: '/asset/page' })
navList.value.push({ category: 'asset', text: 'Notification', path: '/asset/notification' })
navList.value.push({ category: 'asset', text: 'Icon', path: '/asset/icon' })

navList.value.push({ category: 'user', text: 'Compte', path: '/user/account' })

navList.value.push({ category: 'log', text: 'Sandbox', path: '/log/sandbox' })

const toggleSidebar = () => {
    emit('closeSidebar')
}
</script>
