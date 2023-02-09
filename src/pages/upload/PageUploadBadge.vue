<template>
    <div class="grid grid-cols-1 gap-4 h-full">
        <div class="col-span-1">
            <BaseCard>
                <template #title>Importer un fichier (Badge)</template>
                <template #body>
                    <form @submit.prevent="submitPost" enctype="multipart/form-data" class="grid grid-cols-1 gap-3">
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

const loading = ref(false)
const postForm = ref({ code: '', name: '', description: '', file: { base64: '', name: '' } })
const baseUploadFileRef = ref<VNodeRef | null>(null)

const handleFileUpload = (file: { base64: string; name: string }) => (postForm.value.file = file)

const submitPost = async () => {
    if (loading.value) return

    try {
        loading.value = true

        await useFetchAPI('UploadBadge', 'POST', { body: JSON.stringify(postForm.value) })

        showMessage('Le badge a bien été ajouté', false)

        postForm.value = { code: '', name: '', description: '', file: { base64: '', name: '' } }

        baseUploadFileRef.value?.reset()
    } catch (e) {
        console.error(e)
    }

    loading.value = false
}
</script>
