<template>
  <div class="grid h-full grid-cols-1 gap-4">
    <div class="col-span-1">
      <BaseCard>
        <template #title>Importer un fichier (Effet)</template>
        <template #body>
          <form @submit.prevent="submitPost" enctype="multipart/form-data" class="grid grid-cols-1 gap-3 p-4">
            <div class="col-span-full">
              <label class="block mb-1">Fichier (.nitro)</label>
              <BaseUploadFile accept=".nitro" @upload="handleFileUpload" ref="baseUploadFileRef" />
            </div>
            <div class="col-span-1">
              <label class="block mb-1">Id</label>
              <BaseInput v-model="postForm.id" number />
            </div>
            <div class="col-span-1">
              <label for="onlyStaff" class="flex items-center gap-2 cursor-pointer">
                <div class="leading-8">Seulement Staff</div>
                <BaseCheckBox id="onlyStaff" name="onlyStaff" v-model="postForm.onlyStaff" />
              </label>
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
const postForm = ref({ id: 0, onlyStaff: false, file: { base64: '', name: '' } })
const baseUploadFileRef = ref<InstanceType<typeof LazyBaseUploadFile> | null>(null)

const handleFileUpload = (files: { base64: string; name: string }[]) => (postForm.value.file = files[0])

const submitPost = async () => {
  if (loading.value) return

  loading.value = true

  try {
    await $fetch('/api/upload/effect', { body: { ...postForm.value }, method: 'post' })

    showMessage({ message: "L'effet a bien été ajouté", success: true })

    postForm.value = { id: 0, onlyStaff: false, file: { base64: '', name: '' } }

    baseUploadFileRef.value?.reset()
  } catch (e) {
    console.error(e)
  }

  loading.value = false
}
</script>
