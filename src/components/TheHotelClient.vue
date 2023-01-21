<template>
    <iframe
        class="absolute top-0 bottom-0 left-0 right-0 z-0 w-full h-full"
        :src="'https://sandbox.wibbo.org/nitro/?local=' + isLocal + '&sso=' + ssoTicket"
        v-if="!disabledHotel && ssoTicket !== ''"
    ></iframe>
</template>

<script lang="ts" setup>
const isLocal = ref(getConfig<boolean>('local.enabled'))
const disabledHotel = ref(getConfig<boolean>('disabled.hotel'))

const ssoTicket = ref('')

onMounted(async () => (ssoTicket.value = (await useFetchAPI<{ ticket: string }>('client')).ticket))
</script>
