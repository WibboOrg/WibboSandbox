<template>
  <div class="grid h-full grid-cols-1 gap-4">
    <div class="col-span-1">
      <BaseCard>
        <template #title>Importer un fichier (Mobilier)</template>
        <template #body>
          <form @submit.prevent="submitPost" enctype="multipart/form-data" class="grid grid-cols-1 gap-3 p-4">
            <div class="col-span-full">
              <label class="block mb-1">Fichier (.nitro)</label>
              <BaseUploadFile accept=".nitro" @upload="handleFileUpload" ref="baseUploadFileRef" />
            </div>
            <div class="col-span-full">
              <label class="block mb-1">Fichier (.png)</label>
              <BaseUploadFile accept="image/png" @upload="handleFileUploadIcon" ref="baseUploadFileIconRef" />
            </div>
            <div class="col-span-full" v-if="postForm.colors && postForm.colors.length > 0">
              <label class="block mb-1">Couleurs</label>
              <span>{{ postForm.colors.join(', ') }}</span>
            </div>
            <div class="col-span-full">
              <label class="block mb-1">Type</label>
              <BaseSelect v-model="postForm.type" :options="{ s: 'Sol', i: 'Mur' }"></BaseSelect>
            </div>
            <div class="col-span-1">
              <label class="block mb-1">Titre</label>
              <BaseInput v-model="postForm.name" />
            </div>
            <div class="col-span-1">
              <label class="block mb-1">Description</label>
              <BaseInput v-model="postForm.description" />
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
const postForm = ref({ type: 's', name: '', description: '', file: { base64: '', name: '' }, fileIcon: { base64: '', name: '' }, colors: [] as number[] })
const baseUploadFileRef = ref<InstanceType<typeof LazyBaseUploadFile> | null>(null)
const baseUploadFileIconRef = ref<InstanceType<typeof LazyBaseUploadFile> | null>(null)

const handleFileUpload = async (files: { base64: string; name: string }[]) => {
  postForm.value.file = files[0]

  if (files[0] == null) return

  let nitroBuffer: ArrayBuffer | null = null
  nitroBuffer = Base64ToArrayBuffer(postForm.value.file.base64).buffer

  if (nitroBuffer == null) {
    showMessage({ message: 'Une erreur est survenu' })
    return
  }

  const bundled = new NitroBundle()
  bundled.parse(nitroBuffer)

  const colors = []

  for (const file of Object.entries(bundled.files)) {
    const fileName = file[0]
    const fileBuffer = file[1]

    if (fileName.endsWith('.json')) {
      const nitroJson = JSON.parse(NitroBundle.TEXT_DECODER.decode(fileBuffer)) as IAssetData

      if (nitroJson != null && nitroJson.visualizations != null && nitroJson.visualizations.length > 0) {
        for (const visualization of nitroJson.visualizations) {
          if (visualization.size === 64) {
            if (visualization.colors != null) {
              for (const colorId of Object.keys(visualization.colors)) {
                colors.push(Number.parseInt(colorId))
              }
              break
            }
          }
        }
      }
    }
  }

  postForm.value.colors = colors
}

const handleFileUploadIcon = (files: { base64: string; name: string }[]) => (postForm.value.fileIcon = files[0])

const submitPost = async () => {
  if (loading.value) return

  loading.value = true

  try {
    await $fetch('/api/upload/furni', { body: { ...postForm.value }, method: 'post' })

    showMessage({ message: 'Le mobilier a bien été ajouté', success: true })

    postForm.value = { type: 's', name: '', description: '', file: { base64: '', name: '' }, fileIcon: { base64: '', name: '' }, colors: [] }

    baseUploadFileRef.value?.reset()
    baseUploadFileIconRef.value?.reset()
  } catch (e) {
    console.error(e)
  }

  loading.value = false
}
</script>
