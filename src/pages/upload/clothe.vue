<template>
  <div class="grid h-full grid-cols-1 gap-4">
    <div class="col-span-1">
      <BaseCard>
        <template #title>Importer un fichier (Vêtement)</template>
        <template #body>
          <form @submit.prevent="submitPost" enctype="multipart/form-data" class="grid grid-cols-1 gap-3 p-4">
            <div class="col-span-full">
              <label class="block mb-1">Fichier (.nitro)</label>
              <BaseUploadFile accept="image/nitro" @upload="handleFileUpload" ref="baseUploadFileRef" />
            </div>
            <div class="col-span-full">
              <label class="block mb-1">type</label>
              <BaseSelect v-model="postForm.type" :options="categoryType"></BaseSelect>
            </div>
            <div class="col-span-full">
              <label class="block mb-1">Id</label>
              <BaseInput v-model="postForm.id" />
            </div>
            <div class="col-span-full">
              <label class="block mb-1">Parts <BaseButton @click.prevent="addPart">+ Ajouté</BaseButton></label>
            </div>

            <div class="col-span-full">
              <BaseTable>
                <template #head>
                  <BaseTableHead>Id</BaseTableHead>
                  <BaseTableHead>Index</BaseTableHead>
                  <BaseTableHead>ColorIndex</BaseTableHead>
                  <BaseTableHead>Type</BaseTableHead>
                  <BaseTableHead>Colorable</BaseTableHead>
                  <BaseTableHead>Action</BaseTableHead>
                </template>
                <template #body>
                  <BaseTableBody v-for="(part, index) in postForm.parts" :key="index">
                    <BaseTableColunm><BaseInput v-model="part.id" number /></BaseTableColunm>
                    <BaseTableColunm><BaseInput v-model="part.index" number /></BaseTableColunm>
                    <BaseTableColunm><BaseInput v-model="part.colorindex" number /></BaseTableColunm>
                    <BaseTableColunm><BaseInput v-model="part.type" /></BaseTableColunm>
                    <BaseTableColunm><BaseInput v-model="part.colorable" boolean /></BaseTableColunm>
                    <BaseTableColunm><IconClose @click="deletePart(part.id)" class="w-6 h-6 cursor-pointer hover:text-white" /></BaseTableColunm>
                  </BaseTableBody>
                </template>
              </BaseTable>
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
const postForm = ref({ type: 'ha', id: '', parts: [{ id: 0, type: 'ha', colorable: 0, index: 0, colorindex: 0 }], file: { base64: '', name: '' } })
const baseUploadFileRef = ref<InstanceType<typeof LazyBaseUploadFile> | null>(null)
const categoryType = ref({ hr: 'hr', hd: 'hd', ch: 'ch', lg: 'lg', sh: 'sh', ha: 'ha', he: 'he', ea: 'ea', fa: 'fa', ca: 'ca', wa: 'wa', cc: 'cc', cp: 'cp' })

const addPart = () => {
  if (!postForm.value.parts.find((x) => x.id === 0)) postForm.value.parts.push({ id: 0, type: 'ha', colorable: 0, index: 0, colorindex: 0 })
}
const deletePart = (id: number) => (postForm.value.parts = postForm.value.parts.filter((x) => x.id !== id))
const handleFileUpload = (files: { base64: string; name: string }[]) => (postForm.value.file = files[0])

const submitPost = async () => {
  if (loading.value) return

  loading.value = true

  try {
    await $fetch('/api/upload/clothe', { body: { ...postForm.value }, method: 'post' })

    showMessage({ message: 'Le vêtement a bien été ajouté', success: true })

    postForm.value = { type: 'ha', id: '', parts: [{ id: 0, type: 'ha', colorable: 0, index: 0, colorindex: 0 }], file: { base64: '', name: '' } }

    baseUploadFileRef.value?.reset()
  } catch (e) {
    console.error(e)
  }

  loading.value = false
}
</script>
