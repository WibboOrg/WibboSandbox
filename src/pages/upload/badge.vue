<template>
  <div class="grid h-full grid-cols-1 gap-4">
    <div class="col-span-1">
      <BaseCard>
        <template #title>Importer un fichier (Badge)</template>
        <template #body>
          <form @submit.prevent.once="submitPost" enctype="multipart/form-data" class="grid grid-cols-1 gap-3 p-4">
            <div class="col-span-full">
              <label class="block mb-1">Fichier (.gif)</label>
              <BaseUploadFile accept="image/gif" @upload="handleFileUpload" ref="baseUploadFileRef" />
            </div>
            <div class="col-span-1">
              <label class="block mb-1">Code</label>
              <BaseInput v-model="postForm.code" />
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
              <BaseButton primary :loading="loading" type="submit">Importer</BaseButton>
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
const postForm = ref({ code: '', name: '', description: '', file: { base64: '', name: '' } })
const baseUploadFileRef = ref<InstanceType<typeof LazyBaseUploadFile> | null>(null)

const handleFileUpload = (files: { base64: string; name: string }[]) => (postForm.value.file = files[0])

const submitPost = async () => {
  if (loading.value) return

  loading.value = true

  try {
    await $fetch('/api/upload/badge', { body: postForm.value, method: 'post' })

    showMessage({ message: 'Le badge a bien été ajouté', success: true })

    postForm.value = { code: '', name: '', description: '', file: { base64: '', name: '' } }

    baseUploadFileRef.value?.reset()
  } catch (e) {
    console.error(e)
  }

  loading.value = false
}
</script>
