<template>
    <textarea
        class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none"
        :value="value"
        @input="$emit('input', ($event.target as HTMLInputElement).value)"
    >
    </textarea>
</template>

<script lang="ts" setup>
defineProps({
    value: { type: String, default: '' },
})
</script>
