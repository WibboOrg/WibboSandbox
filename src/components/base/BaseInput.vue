<template>
    <input class="w-full px-4 py-2 mt-2 bg-gray-600 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" type="text" v-model="message" />
</template>

<script lang="ts" setup>
const props = defineProps({
    modelValue: { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue'])

const message = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
})
</script>
