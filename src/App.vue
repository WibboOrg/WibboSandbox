<template>
    <div>
        <NuxtLoadingIndicator />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>

<script lang="ts" setup>
useHead({
    titleTemplate: (title?: string) => (title ? `${title} - WibboSandbox` : 'WibboSandbox'),
    meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'msapplication-TileColor', content: '#18202b' },
        { name: 'theme-color', content: '#18202b' },
    ],
    link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
})
</script>
