<template>
    <select class="w-full px-3 py-2 leading-tight bg-gray-600 rounded-md focus:ring-1 appearance-none focus:outline-none" v-model="message">
        <option value="" disabled v-if="defaultChoose != ''">{{ defaultChoose }}</option>
        <option v-for="(text, valueOption, index) in options" :key="index" :value="valueOption">{{ text }}</option>
    </select>
</template>

<script lang="ts" setup>
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
    modelValue: { type: [String, Number], default: '' },
    defaultChoose: { type: String, default: '' },
    options: { type: Object, default: null },
})

const message = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
})
</script>
