<template>
    <div class="w-full py-2 mb-4 text-lg font-bold text-center text-white rounded shadow-xl" :class="isError ? 'bg-red-700' : 'bg-green-700'">
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
defineProps({
    isError: { type: Boolean, default: false },
})
</script>
