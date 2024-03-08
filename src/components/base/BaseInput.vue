<template>
  <div v-if="!isEditing" class="w-full px-4 py-2 whitespace-pre-wrap" :class="{ 'cursor-pointer': props.boolean }" @click="onClick">
    <span v-if="props.boolean">{{ valueUpdated === true ? 'Activer' : 'Désactiver' }}</span>
    <span v-else>{{ valueUpdated }}</span>
  </div>
  <div v-else>
    <input
      class="w-full px-4 py-2 whitespace-pre-wrap bg-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
      :type="type"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :value="modelValue"
      @input="updateValue($event.target as HTMLInputElement)"
      v-if="!textToEdit"
    />
    <div
      v-else
      class="w-full px-4 py-2 whitespace-pre-wrap bg-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
      :class="{ 'text-center': center }"
      @keyup.enter="props.number ? onExit() : null"
      @blur="onExit"
      :value="modelValue"
      @keypress="isValidValue"
      @input="updateValue($event.target as HTMLInputElement)"
      :contenteditable="props.textToEdit"
      ref="componentElement"
    >
      {{ modelValue }}
    </div>
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
  type: { type: String, default: 'text' },
  autocomplete: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue', 'valueUpdated'])

const componentElement = ref<HTMLElement | null>(null)
const componentType = ref<'div' | 'input'>('input')
const valueUpdated = ref(props.modelValue)
const isEditing = ref(!props.textToEdit)
const timeoutId = ref<number>(0)

onMounted(() => {
  componentType.value = props.textToEdit ? 'div' : 'input'
})

onUnmounted(() => {
  if (timeoutId) clearTimeout(timeoutId.value)
})

const isValidValue = (evt: KeyboardEvent) => {
  if (props.number && /[^0-9.]/i.test(evt.key)) evt.preventDefault()
  else return true
}

const onClick = () => {
  if (props.boolean) {
    valueUpdated.value = valueUpdated.value === true ? false : true
    emit('update:modelValue', valueUpdated.value)
    emit('valueUpdated')
    return
  }
  isEditing.value = true
  nextTick(() => placeCaretAtEnd())
}

const onExit = () => {
  if (!props.textToEdit) return

  isEditing.value = false

  if (props.delay > 0) clearTimeout(timeoutId.value)

  if (valueUpdated.value === props.modelValue) return

  emit('update:modelValue', valueUpdated.value)
  emit('valueUpdated')
}

const updateValue = (event: HTMLInputElement | HTMLInputElement | string) => {
  if (typeof event === 'string') valueUpdated.value = event
  else valueUpdated.value = props.textToEdit ? event.innerText : event.value

  if (props.delay > 0) {
    clearTimeout(timeoutId.value)
    timeoutId.value = window.setTimeout(() => {
      emit('update:modelValue', valueUpdated.value)
      emit('valueUpdated')
    }, props.delay)
    return
  }

  if (props.textToEdit) return

  emit('update:modelValue', valueUpdated.value)
  emit('valueUpdated')
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
