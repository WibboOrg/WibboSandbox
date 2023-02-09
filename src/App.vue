<template>
    <div class="w-screen h-screen overflow-hidden antialiased text-white bg-gray-900">
        <TheTopNofitications />

        <TheLogin v-if="auth.token === ''" />
        <div v-else>
            <TheHotelClient v-if="loadHotel" />

            <TheButtonReturn @click="$router.push('/')" />
            <TheNavbar />
            <router-view v-slot="{ Component, route }">
                <transition
                    enter-active-class="duration-300"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="duration-300"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                >
                    <div class="absolute top-0 bottom-0 left-0 right-0 bg-gray-900 bg-opacity-75 overflow-hidden backdrop-blur" id="main" v-show="route.path !== '/hotel'">
                        <div class="overflow-y-overlay h-full w-full pl-[200px]">
                            <div class="fixed top-2 right-4 cursor-pointer" @click="router.push('/hotel')">
                                <IconClose class="w-8 h-8 hover:text-gray-400" />
                            </div>
                            <div class="container my-8">
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
    </div>
</template>

<script lang="ts" setup>
import { router } from './router'

const loadHotel = ref(false)

onMounted(async () => {
    await fetch('/sandbox-config.json')
        .then((res) => res.json())
        .then((res) => (sandboxConfig.value = res))

    await checkAuth()
})

router.afterEach((to) => {
    if (to.path !== '/hotel') return

    if (!loadHotel.value) loadHotel.value = true
})
</script>
