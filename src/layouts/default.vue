<template>
    <div class="w-screen h-screen overflow-hidden antialiased text-white bg-gray-900">
        <TheTopNofitications />

        <TheHotelClient v-if="loadHotel" />

        <TheButtonReturn @click="onReturnButton($route.path)" v-if="$route.path != '/' && (!openMenu || $route.path == '/hotel')" />
        <TheSidebar @close-sidebar="openMenu = false" :open-menu="openMenu" v-if="$route.path != '/'" />
        <transition
            enterActiveClass="duration-300"
            enterFromClass="opacity-0"
            enterToClass="opacity-100"
            leaveActiveClass="duration-300"
            leaveFromClass="opacity-100"
            leaveToClass="opacity-0"
        >
            <main class="absolute top-0 bottom-0 left-0 right-0 overflow-hidden bg-gray-900 bg-opacity-75 backdrop-blur" v-show="$route.path !== '/hotel'">
                <div class="w-full h-full overflow-y-overlay" :class="{ 'pl-[200px]': $route.path != '/' && openMenu }" id="main">
                    <div class="fixed cursor-pointer top-2 right-4" @click="navigateTo('/hotel')" v-if="$route.path != '/'">
                        <IconClose class="w-8 h-8 hover:text-gray-400" />
                    </div>
                    <div class="container my-8 px-8" :class="{ 'h-full': $route.path == '/' }">
                        <NuxtPage />
                    </div>
                </div>
            </main>
        </transition>
    </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const router = useRouter()

const openMenu = ref(true)

const loadHotel = ref(route.path === '/hotel')

const onReturnButton = (path: string) => {
    openMenu.value = true

    if(path === '/hotel') navigateTo('/')
}

router.afterEach((to) => (to.path === '/hotel' && !loadHotel.value ? (loadHotel.value = true) : null))
</script>
