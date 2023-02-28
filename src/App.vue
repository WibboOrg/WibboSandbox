<template>
    <div class="w-screen h-screen overflow-hidden antialiased text-white bg-gray-900">
        <TheTopNofitications />

        <TheHotelClient v-if="loadHotel" />

        <TheButtonReturn @click="$router.push('/')" v-if="$route.path != '/'" />
        <TheNavbar v-if="$route.path != '/'" />
        <router-view v-slot="{ Component, route }">
            <transition
                enter-active-class="duration-300"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="duration-300"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <div class="absolute top-0 bottom-0 left-0 right-0 bg-gray-900 bg-opacity-75 overflow-hidden backdrop-blur" v-show="route.path !== '/hotel'">
                    <div class="overflow-y-overlay h-full w-full" :class="{ 'pl-[200px]': $route.path != '/' }" id="main">
                        <div class="fixed top-2 right-4 cursor-pointer" @click="router.push('/hotel')" v-if="$route.path != '/'">
                            <IconClose class="w-8 h-8 hover:text-gray-400" />
                        </div>
                        <div class="container my-8" :class="{ 'h-full': $route.path == '/' }">
                            <transition
                                enter-active-class="duration-300"
                                enter-from-class="opacity-0"
                                enter-to-class="opacity-100"
                                leave-active-class="duration-300"
                                leave-from-class="opacity-100"
                                leave-to-class="opacity-0"
                                mode="out-in"
                            >
                                <keep-alive>
                                    <component :is="Component" :key="route.path" />
                                </keep-alive>
                            </transition>
                        </div>
                    </div>
                </div>
            </transition>
        </router-view>
    </div>
</template>

<script lang="ts" setup>
const router = useRouter()

const loadHotel = ref(false)

router.afterEach((to) => (to.path === '/hotel' && !loadHotel.value ? (loadHotel.value = true) : null))
</script>
