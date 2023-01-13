<template>
    <div class="w-full p-1 mb-2 rounded" :class="white ? 'bg-white bg-opacity-40' : 'bg-black bg-opacity-60'">
        <div class="p-1">
            <button
                @click="bbcoder(bbcode)"
                type="button"
                class="p-2 bg-transparent border-none rounded hover:bg-black hover:bg-opacity-20"
                :class="!white ? 'text-2xl text-white' : 'text-black'"
                v-for="(icon, bbcode, index) in bbcodes"
                :key="index"
            >
                <i :class="icon"></i>
            </button>

            <BaseSelect class="inline-block w-auto" v-model="selectedColor" @change.native="onChange()" :options="colors" :default-choose="'Couleurs'"></BaseSelect>
        </div>

        <textarea
            class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none"
            rows="5"
            :placeholder="placeholder"
            maxlength="10000"
            name="message"
            ref="textareabbcode"
            v-model="message"
        ></textarea>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    white: { type: Boolean, default: false },
    modelValue: { type: String, default: '' },
    placeholder: { type: String, default: 'Ton message à poster' },
})

const emit = defineEmits(['update:modelValue'])

const message = computed({
    get: () => props.modelValue,
    set: (value: string) => emit('update:modelValue', value),
})

const textareabbcode = ref<HTMLTextAreaElement | null>(null)
const selectedColor = ref('')
const bbcodes = ref<Record<string, string>>({
    b: 'fas fa-bold',
    i: 'fas fa-italic',
    u: 'fas fa-underline',
    quote: 'fas fa-quote-right',
    'size=small': 'fas fa-search-minus',
    'size=large': 'fas fa-search-plus',
    code: 'fas fa-code',
    'url=url': 'fas fa-link',
    youtube: 'fab fa-youtube',
    img: 'fas fa-images',
})
const colors = ref<Record<string, string>>({
    red: 'Rouge',
    orange: 'Orange',
    yellow: 'Jaune',
    green: 'Vert',
    cyan: 'Cyan',
    blue: 'Bleu',
    gray: 'Gris',
    black: 'Noir',
})

const onChange = () => {
    if (selectedColor.value == '') return

    bbcoder('color=' + selectedColor.value)
}

const bbcoder = (code: string) => {
    if (!textareabbcode.value) return

    let newValue = textareabbcode.value.value

    const startPos = textareabbcode.value.selectionStart
    const endPos = textareabbcode.value.selectionEnd

    const selectedText = newValue.substring(startPos, endPos)

    const endCode = code.includes('=') ? code.split('=')[0] : code

    newValue = replaceBetween(newValue, startPos, endPos, '[' + code + ']' + selectedText + '[/' + endCode + ']')
    textareabbcode.value.focus()

    message.value = newValue
}

const replaceBetween = (value: string, start: number, end: number, what: string) => {
    return value.substring(0, start) + what + value.substring(end)
}
</script>
