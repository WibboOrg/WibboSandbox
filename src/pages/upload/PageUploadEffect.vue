<template>
    <div class="grid grid-cols-1 gap-4 h-full">
        <div class="col-span-1">
            <BaseCard>
                <template #title>Importer un effet</template>
                <template #body>
                    <form @submit.prevent="submitPost" enctype="multipart/form-data" class="grid grid-cols-1 gap-3">
                        <div class="col-span-full">
                            <label class="block mb-1">Fichier (.nitro)</label>
                            <BaseUploadFile accept="image/nitro" @upload="handleFileUpload" />
                        </div>
                        <div class="col-span-1">
                            <label class="block mb-1">Id</label>
                            <BaseInput v-model="postForm.id" />
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
const loading = ref(false)
const postForm = ref({ id: 0, file: { base64: '', name: '' } })

const handleFileUpload = (file: { base64: string; name: string }) => (postForm.value.file = file)

const submitPost = async () => {
    if (loading.value) return

    try {
        loading.value = true

        await useFetchAPI('UploadEffect', 'POST', { body: JSON.stringify(postForm.value) })

        showMessage("L'effet a bien été ajouté", false)

        postForm.value = { id: 0, file: { base64: '', name: '' } }
    } catch (e) {
        console.error(e)
    }

    loading.value = false
}
</script>
