<template>
    <div class="w-screen h-screen overflow-hidden antialiased text-white bg-gray-900">
        <div class="flex flex-col items-center justify-center h-full gap-4 text-center">
            <h3 class="text-xl font-bold">PAGE INTROUVALE!</h3>
            <img src="~/assets/imgs/teaser_frank_looking.png" class="ml-[35px]" />
            <div>
                <span class="text-lg">Il semble que la page que vous cherchiez est introuvable. Vérifie l'URL ou essaie de recommencer</span>
                <BaseButton @click="handleError" primary>Retour a la page d'acceuil</BaseButton>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    title: 'Page introuvable',
})

const props = defineProps({
    error: Object,
})

const handleError = () => clearError({ redirect: '/' })
</script>