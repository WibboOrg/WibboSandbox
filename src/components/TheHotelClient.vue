<template>
  <iframe class="absolute top-0 bottom-0 left-0 right-0 z-0 w-full h-full" :src="clientUrl + '?sso=' + ssoTicket + '&socketId=' + (isLocal ? 1 : 2)" v-if="ssoTicket && !error && !pending"></iframe>
</template>

<script lang="ts" setup>
const { nitroClientUrl } = useRuntimeConfig().public

const isLocal = ref(process.env.NODE_ENV !== 'production')
const clientUrl = ref(nitroClientUrl)

const { data: ssoTicket, pending, error, refresh } = await useAsyncData('sso-ticket', () => $fetch('/api/user/ticket'))
</script>
