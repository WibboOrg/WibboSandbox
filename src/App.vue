<template>
    <div class="w-screen h-screen overflow-hidden antialiased text-white bg-gray-900">
        <TheTopNofitications />

        <TheLogin v-if="auth.logged === false" />
        <div v-else>
            <iframe class="absolute top-0 bottom-0 left-0 right-0 z-0 w-full h-full" :src="'https://sandbox.wibbo.org/nitro/?local=true&sso=' + auth.ssoticket" v-if="auth.ssoticket !== ''"></iframe>

            <TheButtonReturn />
            <TheNavbar />

            <transition
                enter-active-class="duration-300"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="duration-300"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <div
                    class="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-75"
                    v-show="$route.path !== '/hotel'"
                    :key="$route.path !== '/hotel' ? 'true' : 'false'"
                >
                    <transition
                        enter-active-class="absolute duration-300"
                        enter-from-class="opacity-0"
                        enter-to-class="opacity-100"
                        leave-active-class="absolute duration-300"
                        leave-from-class="opacity-100"
                        leave-to-class="opacity-0"
                    >
                        <router-view></router-view>
                    </transition>
                </div>
            </transition>
        </div>
    </div>
</template>

<script lang="ts" setup>
const isLocal = ref(false)

onMounted(async () => {
    checkAuth()

    isLocal.value = getConfig('local.enabled') === 'true'
})
</script>
