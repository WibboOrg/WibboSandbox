<template>
    <div v-if="!isEditing" class="w-full px-4 py-2" @dblclick="onDblClick">
        {{ valueUpdated }}
    </div>
    <component
        :is="componentType"
        class="w-full px-4 py-2 bg-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
        :class="{ 'text-center': center, 'h-[180px]': componentType === 'textarea', 'w-6 h-4 focus:ring-0 translate-x-1/2': props.checkBox }"
        :type="props.checkBox ? 'checkbox' : 'text'"
        @keyup.enter="onExit"
        @blur="onExit"
        @input="updateValue($event.target)"
        :value="modelValue"
        :checked="props.checkBox && valueUpdated === '1'"
        ref="componentElement"
        v-else
    />
</template>

<script lang="ts" setup>
const props = defineProps({
    modelValue: { type: [String, Number, Boolean], default: '' },
    textToEdit: { type: Boolean, default: false },
    center: { type: Boolean, default: false },
    checkBox: { type: Boolean, default: false },
    delay: { type: Number, default: 0 },
})

const emit = defineEmits(['update:modelValue'])

const componentElement = ref<HTMLElement | null>(null)
const componentType = ref<'textarea' | 'input'>('input')
const valueUpdated = ref(props.modelValue)
const isEditing = ref(!props.textToEdit)
const timeoutId = ref<number>(0)

onMounted(() => {
    if (typeof props.modelValue === 'string' && props.modelValue.length > 100) componentType.value = 'textarea'
})

const onDblClick = () => {
    isEditing.value = true
    nextTick(() => componentElement.value?.focus())
}

const onExit = () => {
    if (!props.textToEdit) return

    isEditing.value = false

    if (props.delay > 0) clearTimeout(timeoutId.value)

    emit('update:modelValue', valueUpdated.value)
}

const updateValue = (event: HTMLInputElement | null) => {
    if (!event) return

    valueUpdated.value = props.checkBox ? (event.checked ? '1' : '0') : event.value

    if (props.delay > 0) {
        clearTimeout(timeoutId.value)
        timeoutId.value = setTimeout(() => emit('update:modelValue', valueUpdated.value), props.delay)
        return
    }

    if (props.textToEdit) return

    emit('update:modelValue', valueUpdated.value)
}
</script>
