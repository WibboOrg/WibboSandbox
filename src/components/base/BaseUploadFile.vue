<template>
  <label class="form-control w-full my-2" @drop.prevent="dropHandler" @dragover.prevent="inDrag = true" @dragleave="inDrag = false" @dragend.prevent>
    <input type="file" class="file-input file-input-bordered w-full" ref="upload" :accept="accept" @change="onChange()" :multiple="multiple" />
  </label>
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

  if (!files || !upload.value) return

  fileUploads.value = files
  upload.value.files = files

  sendUploadFiles(files)
}

const sendUploadFiles = async (files: FileList) => {
  const promises: Promise<{ base64: string; name: string }>[] = []
  for (const file of files) {
    console.log('file.name', file.name)
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
</script>
