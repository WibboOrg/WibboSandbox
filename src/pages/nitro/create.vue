<template>
  <div class="grid grid-cols-1 gap-4">
    <div class="col-span-1">
      <BaseCard>
        <template #title>Crée un fichier Nitro</template>
        <template #body>
          <form @submit.prevent="submitPost" enctype="multipart/form-data" class="grid grid-cols-1 gap-3 p-4">
            <div class="col-span-full">
              <label class="block mb-1">Fichier (.png)</label>
              <BaseUploadFile accept="image/png" @upload="handleFileUploadPng" ref="baseUploadFileRef" />
            </div>

            <div class="col-span-full">
              <label class="block mb-1">Fichier (.json)</label>
              <BaseUploadFile accept="application/JSON" @upload="handleFileUploadJson" ref="baseUploadFileRef" />
            </div>

            <div class="col-span-full">
              <label class="block mb-1">Nom</label>
              <BaseInput v-model="postForm.name"></BaseInput>
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
import { type IAssetData } from '../../types'

const { showMessage } = useNotification()

const loading = ref(false)
const postForm = ref({ name: '' })
const baseUploadFileRef = ref<InstanceType<typeof LazyBaseUploadFile> | null>(null)
const nitroImage = ref<string>('')
const nitroJson = ref<IAssetData | null>(null)

const handleFileUploadJson = (files: { base64: string; name: string }[]) => (nitroJson.value = JSON.parse(NitroBundle.TEXT_DECODER.decode(Base64ToArrayBuffer(files[0].base64))))
const handleFileUploadPng = (files: { base64: string; name: string }[]) => (nitroImage.value = 'data:image/png;base64,' + files[0].base64)

const submitPost = async () => {
  if (loading.value) return

  try {
    loading.value = true

    const nitroFileName = nitroJson.value?.name ?? ''

    if (nitroFileName === '') {
      showMessage({ message: 'Une erreur est survenu' })
      return
    }

    const jsonString = JSON.stringify(nitroJson.value).replaceAll(nitroFileName, postForm.value.name)

    const newBundled = new NitroBundle()
    newBundled.addFile(postForm.value.name + '.json', NitroBundle.TEXT_ENCODER.encode(jsonString))
    newBundled.addFile(postForm.value.name + '.png', Base64ToArrayBuffer(nitroImage.value))

    const nitroBuffer = await newBundled.toBufferAsync()

    const downloadLink = document.createElement('a')
    downloadLink.href = 'data:application/octet-binary;base64,' + ArrayBufferToBase64(nitroBuffer)
    downloadLink.download = postForm.value.name + '.nitro'
    downloadLink.click()
  } catch (e) {
    console.error(e)
  }

  loading.value = false
}
</script>
