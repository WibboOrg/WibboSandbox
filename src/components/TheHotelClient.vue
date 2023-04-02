<template>
    <iframe
        class="absolute top-0 bottom-0 left-0 right-0 z-0 w-full h-full"
        :src="'https://sandbox.wibbo.org/nitro/?local=' + isLocal + '&sso=' + ssoTicket"
        v-if="ssoTicket"
    ></iframe>
</template>

<script lang="ts" setup>
const runtimeConfig = useRuntimeConfig()
const ssoTicket = ref('')

onMounted(async () => ssoTicket.value = await $fetch('/api/user/ticket'))

const isLocal = ref(runtimeConfig.public.enableLocal === "true")
</script>
