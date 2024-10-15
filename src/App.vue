j
<template>
  <div data-theme="dark">
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
useHead({
  titleTemplate: (title?: string) => (title ? `${title} - WibboSandbox` : 'WibboSandbox'),
  title: '',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'msapplication-TileColor', content: '#18202b' },
    { name: 'theme-color', content: '#18202b' }
  ],
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  htmlAttrs: {
    lang: 'fr'
  }
})
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  overflow: hidden;
}

::-webkit-scrollbar {
  width: 14px;
}
::-webkit-scrollbar-thumb {
  border: 4px solid rgba(0, 0, 0, 0);
  background-clip: padding-box;
  border-radius: 9999px;
  background-color: rgba(255, 255, 255, 0.2);
}
::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.6);
}

.overflow-y-overlay {
  overflow-y: overlay !important;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
