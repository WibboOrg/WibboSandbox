<template>
    <div class="w-screen h-screen overflow-hidden antialiased text-white bg-gray-900">
        <TheTopNofitications />

        <TheHotelClient v-if="loadHotel" />

        <TheButtonReturn @click="navigateTo('/')" v-if="$route.path != '/'" />
        <TheNavbar v-if="$route.path != '/'" />
        <transition
            enter-active-class="duration-300"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="duration-300"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div class="absolute top-0 bottom-0 left-0 right-0 overflow-hidden bg-gray-900 bg-opacity-75 backdrop-blur" v-show="$route.path !== '/hotel'">
                <div class="w-full h-full overflow-y-overlay" :class="{ 'pl-[200px]': $route.path != '/' }" id="main">
                    <div class="fixed cursor-pointer top-2 right-4" @click="navigateTo('/hotel')" v-if="$route.path != '/'">
                        <IconClose class="w-8 h-8 hover:text-gray-400" />
                    </div>
                    <div class="container my-8" :class="{ 'h-full': $route.path == '/' }">
                        <NuxtPage />
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const router = useRouter()

const loadHotel = ref(route.path === '/hotel')

router.afterEach((to) => (to.path === '/hotel' && !loadHotel.value ? (loadHotel.value = true) : null))
</script>
