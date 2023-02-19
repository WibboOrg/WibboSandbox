<template>
    <div class="grid grid-cols-1 gap-4 h-full">
        <div class="col-span-1">
            <BaseCard>
                <template #title>Importer un fichier (Effet)</template>
                <template #body>
                    <form @submit.prevent="submitPost" enctype="multipart/form-data" class="grid grid-cols-1 gap-3">
                        <div class="col-span-full">
                            <label class="block mb-1">Fichier (.nitro)</label>
                            <BaseUploadFile accept="image/nitro" @upload="handleFileUpload" ref="baseUploadFileRef" />
                        </div>
                        <div class="col-span-1">
                            <label class="block mb-1">Id</label>
                            <BaseInput v-model="postForm.id" number />
                        </div>
                        <div class="col-span-1">
                            <label class="block mb-1">Seulement Staff</label>
                            <BaseSelect v-model="postForm.only_staff" :options="{ '0': 'Désactiver', '1': 'Activer' }" />
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
const postForm = ref({ id: 0, only_staff: 0, file: { base64: '', name: '' } })
const baseUploadFileRef = ref<VNodeRef | null>(null)

const handleFileUpload = (file: { base64: string; name: string }) => (postForm.value.file = file)

const submitPost = async () => {
    if (loading.value) return

    try {
        loading.value = true

        await useFetchAPI('UploadEffect', 'POST', { body: JSON.stringify(postForm.value) })

        showMessage({ message: "L'effet a bien été ajouté", success: true })

        postForm.value = { id: 0, only_staff: 0, file: { base64: '', name: '' } }

        baseUploadFileRef.value?.reset()
    } catch (e) {
        console.error(e)
    }

    loading.value = false
}
</script>
