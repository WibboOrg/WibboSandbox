<template>
    <div v-if="!isEditing" class="w-full px-4 py-2" @dblclick="onDblClick">
        {{ valueUpdated }}
    </div>
    <div v-else>
        <select
            v-if="props.boolean"
            class="w-full px-4 py-2 bg-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            @keyup.enter="onExit"
            @blur="onExit"
            :value="modelValue"
            @change="updateValue($event.target as HTMLSelectElement)"
        >
            <option value="1">Activer</option>
            <option value="0">Désactiver</option>
        </select>
        <component
            v-else
            :is="componentType"
            class="w-full px-4 py-2 bg-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            :class="{ 'text-center': center, 'h-[180px]': componentType === 'textarea' }"
            type="text"
            @keyup.enter="onExit"
            @blur="onExit"
            @input="updateValue($event.target)"
            :value="modelValue"
            @keypress="isValidSearch"
            ref="componentElement"
        />
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    modelValue: { type: [String, Number, Boolean], default: '' },
    textToEdit: { type: Boolean, default: false },
    center: { type: Boolean, default: false },
    boolean: { type: Boolean, default: false },
    number: { type: Boolean, default: false },
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

const isValidSearch = (evt: KeyboardEvent) => {
    if (props.number && /[^0-9]/i.test(evt.key)) evt.preventDefault()
    else return true
}

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

const updateValue = (event: HTMLInputElement | HTMLSelectElement) => {
    if (!event) return

    valueUpdated.value = event.value

    if (props.delay > 0) {
        clearTimeout(timeoutId.value)
        timeoutId.value = setTimeout(() => emit('update:modelValue', valueUpdated.value), props.delay)
        return
    }

    if (props.textToEdit) return

    emit('update:modelValue', valueUpdated.value)
}
</script>
