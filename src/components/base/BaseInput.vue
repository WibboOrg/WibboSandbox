<template>
    <div v-if="!isEditing" class="w-full px-4 py-2" @click="onClick">
        {{ valueUpdated }}
    </div>
    <div v-else>
        <select
            v-if="props.boolean"
            class="w-full px-4 py-2 bg-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            @keyup.enter="onExit"
            @blur="onExit"
            :value="modelValue"
            @change="updateValue(($event.target as HTMLSelectElement).value)"
            ref="componentElement"
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
            :placeholder="placeholder"
            @keyup.enter="onExit"
            @blur="onExit"
            @input="updateValue(props.textToEdit ? ($event.target as HTMLInputElement).innerText : ($event.target as HTMLInputElement).value)"
            :value="modelValue"
            @keypress="isValidSearch"
            :contenteditable="props.textToEdit"
            ref="componentElement"
        >
            {{ modelValue }}
        </component>
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
    placeholder: { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue'])

const componentElement = ref<HTMLElement | null>(null)
const componentType = ref<'textarea' | 'div' | 'input'>('input')
const valueUpdated = ref(props.modelValue)
const isEditing = ref(!props.textToEdit)
const timeoutId = ref<number>(0)

onMounted(() => {
    if (typeof props.modelValue === 'string' && props.modelValue.length > 100) componentType.value = 'textarea'
    if (typeof props.modelValue === 'string' && props.textToEdit) componentType.value = 'div'
    if (typeof props.modelValue === 'string' && !props.textToEdit) componentType.value = 'input'
})

const isValidSearch = (evt: KeyboardEvent) => {
    if (props.number && /[^0-9]/i.test(evt.key)) evt.preventDefault()
    else return true
}

const onClick = () => {
    isEditing.value = true
    nextTick(() => placeCaretAtEnd())
}

const onExit = () => {
    if (!props.textToEdit) return

    isEditing.value = false

    if (props.delay > 0) clearTimeout(timeoutId.value)

    emit('update:modelValue', valueUpdated.value)
}

const updateValue = (value: string) => {
    valueUpdated.value = value

    if (props.delay > 0) {
        clearTimeout(timeoutId.value)
        timeoutId.value = setTimeout(() => emit('update:modelValue', valueUpdated.value), props.delay)
        return
    }

    if (props.textToEdit) return

    emit('update:modelValue', valueUpdated.value)
}

const placeCaretAtEnd = () => {
    if (!componentElement.value) return

    componentElement.value?.focus()
    const range = document.createRange()
    range.selectNodeContents(componentElement.value)
    range.collapse(false)
    const sel = window.getSelection()
    if (sel) {
        sel.removeAllRanges()
        sel.addRange(range)
    }
}
</script>
