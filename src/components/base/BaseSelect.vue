<template>
    <select
        class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none"
        :value="value"
        @input="$emit('input', ($event.target as HTMLInputElement).value)"
    >
        <option value="" disabled v-if="defaultChoose != ''">{{ defaultChoose }}</option>
        <option v-for="(text, valueOption, index) in options" :key="index" :value="valueOption">{{ text }}</option>
    </select>
</template>

<script lang="ts" setup>
defineProps({
    value: { type: String, default: '' },
    defaultChoose: { type: String, default: '' },
    options: { type: Object, default: null },
})
//Record<string|number, string|number>
</script>
