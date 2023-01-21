<template>
    <div v-if="!isEditing" class="w-full px-4 py-2" @dblclick="isEditing = true">{{ message }}</div>
    <input
        v-else
        class="w-full px-4 py-2 bg-gray-600 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
        :class="center ? 'text-center' : ''"
        type="text"
        @keyup.enter="onExit"
        @blur="onExit"
        v-model="message"
    />
</template>

<script lang="ts" setup>
const props = defineProps({
    modelValue: { type: [String, Number], default: '' },
    textToEdit: { type: Boolean, default: false },
    center: { type: Boolean, default: false },
    delay: { type: Number, default: 0 },
})

const emit = defineEmits(['update:modelValue'])

const valueUpdated = ref(props.modelValue)
const isEditing = ref(!props.textToEdit)
const timeoutId = ref<number>(0)

const onExit = () => {
    if (!props.textToEdit) return

    isEditing.value = false

    emit('update:modelValue', valueUpdated.value)
}

const updateValue = (value: string | number) => {
    if (props.textToEdit) {
        valueUpdated.value = value
        return
    }
    if (props.delay > 0) {
        clearTimeout(timeoutId.value)
        timeoutId.value = setTimeout(() => emit('update:modelValue', value), props.delay)
        return
    }

    emit('update:modelValue', value)
}

const message = computed({
    get: () => props.modelValue,
    set: (value) => updateValue(value),
})
</script>
