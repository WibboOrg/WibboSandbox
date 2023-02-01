<template>
    <div class="flex items-center justify-center w-full" @drop.prevent="dropHandler" @dragover.prevent="inDrag = true" @dragleave="inDrag = false" @dragend.prevent>
        <label class="relative flex flex-col w-full h-16 overflow-hidden border-4 border-blue-200 m-2" :class="inDrag ? 'border-solid animate-pulse' : 'border-dashed'">
            <div class="flex flex-col items-center justify-center pt-3" v-if="!isFileImage">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-gray-400 group-hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" v-if="fileUpload == null">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">{{ fileUpload ? fileUpload.name : 'Importer un fichier' }}</p>
            </div>

            <div class="flex items-center justify-center w-full h-full" v-else>
                <img :src="imageUrl" class="max-w-full max-h-full" v-if="imageUrl" />
            </div>

            <input type="file" class="opacity-0" ref="upload" :accept="accept" @change="onChange()" hidden />
        </label>
    </div>
</template>

<script lang="ts" setup>
defineProps({
    accept: { type: String, default: '' },
})

const emit = defineEmits(['upload'])

const fileUpload = ref<File | null>(null)
const inDrag = ref(false)
const upload = ref<HTMLInputElement | null>(null)

const onChange = () => {
    if (!upload.value || !upload.value.files) return

    const file = upload.value.files[0]

    if (!file) return

    fileUpload.value = file

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => emit('upload', { base64: reader.result?.toString() || '', name: file.name })
}

const dropHandler = (ev: DragEvent) => {
    inDrag.value = false

    const file = ev.dataTransfer?.files[0]

    if (!file) return

    fileUpload.value = file

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => emit('upload', { base64: reader.result?.toString() || '', name: file.name })
}

const isFileImage = computed(() => fileUpload.value && fileUpload.value['type'].split('/')[0] === 'image')

const imageUrl = computed(() => (fileUpload.value ? URL.createObjectURL(fileUpload.value) : null))
</script>
