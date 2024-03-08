<template>
    <button class="w-full text-white transition-colors rounded-lg hover:text-gray-400 border-2 px-2 py-1" :class="disabled ? '!text-gray-500 border-gray-500 cursor-not-allowed' : ''" :disabled="disabled">
        <slot></slot>
        <BaseSpinner :loading="loading" v-if="loading" />
    </button>
</template>

<script lang="ts" setup>
defineProps({
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
})
</script>
