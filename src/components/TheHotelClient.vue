<template>
    <iframe
        class="absolute top-0 bottom-0 left-0 right-0 z-0 w-full h-full"
        :src="'https://sandbox.wibbo.org/nitro/?local=' + isLocal + '&sso=' + auth.user.ticket"
        v-if="auth.user.ticket !== ''"
    ></iframe>
</template>

<script lang="ts" setup>
const isLocal = ref(getConfig<boolean>('local.enabled'))
</script>
