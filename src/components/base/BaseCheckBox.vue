<template>
    <div class="relative cursor-pointer">
        <input type="checkbox" class="sr-only" :id="id" :name="name" :checked="value" @input="$emit('input', ($event.target as HTMLInputElement).checked)" />

        <div class="block h-8 rounded-full w-14" :class="!white ? 'bg-gray-600' : 'bg-white'"></div>

        <div class="absolute w-6 h-6 transition bg-white rounded-full dot left-1 top-1" :class="white ? 'bg-gray-600' : 'bg-white'"></div>
    </div>
</template>

<script lang="ts" setup>
defineProps({
    value: { type: Boolean, default: false },
    white: { type: Boolean, default: false },
    name: { type: String, required: true },
    id: { type: String, required: true },
})
</script>

<style lang="scss">
input:checked ~ .dot {
    transform: translateX(100%);
    background-color: #48bb78;
}
</style>
