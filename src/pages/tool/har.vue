<template>
  <div class="grid grid-cols-1 gap-4">
    <div class="col-span-1">
      <BaseCard>
        <template #title>Extraire un fichier har</template>
        <template #body>
          <form @submit.prevent="submitPost" enctype="multipart/form-data" class="grid grid-cols-4 gap-3 p-4">
            <div class="col-span-full">
              <label class="block mb-1">Fichier (.har)</label>
              <BaseUploadFile accept=".har" @upload="handleFileUpload" ref="baseUploadFileRef" />
            </div>

            <div class="col-span-full">
              <BaseButton primary :loading="loading">Importer</BaseButton>
            </div>
          </form>
        </template>
      </BaseCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { LazyBaseUploadFile } from '#build/components'

const { showMessage } = useNotification()

const loading = ref(false)
const postForm = ref({ file: { base64: '', name: '' } })
const baseUploadFileRef = ref<InstanceType<typeof LazyBaseUploadFile> | null>(null)
const handleFileUpload = (files: { base64: string; name: string }[]) => (postForm.value.file = files[0])

const submitPost = async () => {
  if (loading.value) return

  if (postForm.value.file.name === '') {
    showMessage({ message: 'Vous devez mettre un fichier .har' })
    return
  }

  try {
    loading.value = true

    const jsonHar = JSON.parse(NitroBundle.TEXT_DECODER.decode(Base64ToArrayBuffer(postForm.value.file.base64))) as IHar

    const downloadLink = document.createElement('a')

    for (const entrie of jsonHar.log.entries) {
      const url = entrie.request.url
      const fileName = url.substring(url.lastIndexOf('/') + 1)
      const content = entrie.response.content

      downloadLink.href = 'data:' + content.mimeType + ';' + content.encoding + ',' + encodeURIComponent(content.text)
      downloadLink.download = fileName
      downloadLink.click()
    }

    postForm.value = { file: { base64: '', name: '' } }

    baseUploadFileRef.value?.reset()
  } catch (e) {
    console.error(e)
  }

  loading.value = false
}

interface IHar {
  log: ILog
}

interface ILog {
  entries: IEntrie[]
}

interface IEntrie {
  request: { url: string }
  response: { content: { mimeType: string; encoding: string; text: string } }
}
</script>
