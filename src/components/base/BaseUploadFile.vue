<template>
  <div class="flex items-center justify-center w-full" @drop.prevent="dropHandler" @dragover.prevent="inDrag = true" @dragleave="inDrag = false" @dragend.prevent>
    <label class="relative flex flex-col w-full h-16 overflow-hidden border-4 border-blue-200 m-2" :class="inDrag ? 'border-solid animate-pulse' : 'border-dashed'">
      <div class="flex flex-col items-center justify-center pt-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-gray-400 group-hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" v-if="fileUploads == null || fileUploads?.length === 0">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600" v-else>{{ fileUploads?.length }} fichier{{ fileUploads?.length > 1 ? 's' : '' }} ({{ getFilesName() }})</p>
      </div>

      <input type="file" class="opacity-0" ref="upload" :accept="accept" @change="onChange()" :multiple="multiple" hidden />
    </label>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  accept: { type: String, default: '' },
  multiple: { type: Boolean, default: false }
})

const emit = defineEmits(['upload'])

const fileUploads = ref<FileList | null>(null)
const inDrag = ref(false)
const upload = ref<HTMLInputElement | null>(null)

const reset = () => (fileUploads.value = null)

defineExpose({ reset })

const onChange = () => {
  if (!upload.value || !upload.value.files) return

  const files = upload.value.files

  if (!files) return

  fileUploads.value = files

  sendUploadFiles(files)
}

const dropHandler = (ev: DragEvent) => {
  inDrag.value = false

  const files = ev.dataTransfer?.files

  if (!files) return

  fileUploads.value = files

  sendUploadFiles(files)
}

const sendUploadFiles = async (files: FileList) => {
  const promises: Promise<{ base64: string; name: string }>[] = []
  for (const file of files) {
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)

    promises.push(
      new Promise((resolve, reject) => {
        reader.onload = () => {
          if (!(reader.result instanceof ArrayBuffer)) {
            reject('Error while reading the file')
            return
          }

          const bytes = Array.from(new Uint8Array(reader.result))

          const base64StringFile = btoa(bytes.map((item) => String.fromCharCode(item)).join(''))

          resolve({ base64: base64StringFile, name: file.name })
        }

        reader.onerror = () => {
          reject('Error while reading the file')
        }
      })
    )
  }

  const results = await Promise.all(promises).then((values) => values.filter((value) => value))

  emit('upload', results)
}

const getFilesName = () => {
  if (!fileUploads.value) return ''

  return [...fileUploads.value].map((f) => f.name).join(', ')
}
</script>
