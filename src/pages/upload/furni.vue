<template>
    <div class="grid h-full grid-cols-1 gap-4">
        <div class="col-span-1">
            <BaseCard>
                <template #title>Importer un fichier (Mobilier)</template>
                <template #body>
                    <form @submit.prevent="submitPost" enctype="multipart/form-data" class="grid grid-cols-1 gap-3">
                        <div class="col-span-full">
                            <label class="block mb-1">Fichier (.nitro)</label>
                            <BaseUploadFile accept="image/nitro" @upload="handleFileUpload" ref="baseUploadFileRef" />
                        </div>
                        <div class="col-span-full">
                            <label class="block mb-1">Fichier (.png)</label>
                            <BaseUploadFile accept="image/png" @upload="handleFileUploadIcon" ref="baseUploadFileIconRef" />
                        </div>
                        <div class="col-span-full">
                            <label class="block mb-1">type</label>
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
import { VNodeRef } from 'vue'

const { showMessage } = useNotification()

const loading = ref(false)
const postForm = ref({ type: 's', name: '', description: '', file: { base64: '', name: '' }, fileIcon: { base64: '', name: '' } })
const baseUploadFileRef = ref<VNodeRef | null>(null)
const baseUploadFileIconRef = ref<VNodeRef | null>(null)

const handleFileUpload = (file: { base64: string; name: string }) => (postForm.value.file = file)
const handleFileUploadIcon = (file: { base64: string; name: string }) => (postForm.value.fileIcon = file)

const submitPost = async () => {
    if (loading.value) return

    try {
        loading.value = true

        await useFetch('UploadFurni', { body: postForm.value, method: 'POST' })

        showMessage({ message: 'Le mobilier a bien été ajouté', success: true })

        postForm.value = { type: 's', name: '', description: '', file: { base64: '', name: '' }, fileIcon: { base64: '', name: '' } }

        baseUploadFileRef.value?.reset()
        baseUploadFileIconRef.value?.reset()
    } catch (e) {
        console.error(e)
    }

    loading.value = false
}
</script>
