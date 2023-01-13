<template>
    <transition name="opacity">
        <div class="absolute top-0 bottom-0 left-0 right-0 z-10 overflow-hidden backdrop-blur-sm" v-if="loading">
            <div class="absolute z-10 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                <svg class="w-10 h-10 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        </div>
    </transition>
</template>

<script lang="ts" setup>
defineProps({
    loading: { type: Boolean, default: false },
})
</script>
