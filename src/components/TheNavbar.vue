<template>
    <transition
        enter-active-class="duration-300"
        enter-from-class="-translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="duration-300"
        leave-from-class="translate-x-0"
        leave-to-class="-translate-x-full"
    >
        <nav class="absolute top-0 bottom-0 left-0 z-10 flex flex-col h-full gap-1 p-4 bg-gray-800 shadow shadow-gray-600" v-show="$route.path !== '/hotel'" :key="$route.path !== '' ? 'yes' : 'no'">
            <div class="flex justify-between py-2">
                <span class="font-bold">SandBox</span>

                <div class="cursor-pointer" @click="$router.push('/hotel')">
                    <IconClose />
                </div>
            </div>

            <ul class="flex flex-col gap-1 overflow-y-overlay">
                <li
                    class="w-full p-2 text-center transition-colors border-2 border-gray-700 cursor-pointer hover:bg-gray-600"
                    @click="$router.push(nav.path)"
                    v-for="(nav, index) of navList"
                    :key="index"
                >
                    {{ nav.name }}
                </li>
                <li class="w-full p-2 text-center transition-colors border-2 border-gray-700 cursor-pointer hover:bg-gray-600" @click="logout">Déconnexion</li>
            </ul>
        </nav>
    </transition>
</template>

<script lang="ts" setup>
const navList = ref<{ name: string; path: string }[]>([])

navList.value.push({ name: 'Acceuil', path: '/' })
navList.value.push({ name: 'Ajouter des mobiliers', path: '/upload-furni' })
navList.value.push({ name: 'Modifier furnidata', path: '/furnidata' })
navList.value.push({ name: 'Catalogue', path: '/catalog' })
</script>
