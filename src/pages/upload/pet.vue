<template>
  <div class="grid h-full grid-cols-1 gap-4">
    <div class="col-span-1">
      <BaseCard>
        <template #title>Importer un fichier (Animal)</template>
        <template #body>
          <form @submit.prevent="submitPost" enctype="multipart/form-data" class="grid grid-cols-1 gap-3 p-4">
            <div class="col-span-full">
              <label class="block mb-1">Fichier (.nitro)</label>
              <BaseUploadFile accept=".nitro" @upload="handleFileUpload" ref="baseUploadFileRef" />
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

  loading.value = true

  try {
    await $fetch('/api/upload/pet', { body: { ...postForm.value }, method: 'post' })

    showMessage({ message: "L'animal a bien été ajouté", success: true })

    postForm.value = { file: { base64: '', name: '' } }

    baseUploadFileRef.value?.reset()
  } catch (e) {
    console.error(e)
  }

  loading.value = false
}
</script>
