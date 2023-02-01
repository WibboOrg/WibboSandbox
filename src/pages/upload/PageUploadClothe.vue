<template>
    <div class="grid grid-cols-1 gap-4 h-full">
        <div class="col-span-1">
            <BaseCard>
                <template #title>Importer un vêtement</template>
                <template #body>
                    <form @submit.prevent="submitPost" enctype="multipart/form-data" class="grid grid-cols-1 gap-3">
                        <div class="col-span-full">
                            <label class="block mb-1">Fichier (.nitro)</label>
                            <BaseUploadFile accept="image/nitro" @upload="handleFileUpload" />
                        </div>
                        <div class="col-span-full">
                            <label class="block mb-1">type</label>
                            <BaseSelect v-model="postForm.type" :options="{ ha: 'ha', he: 'he' }"></BaseSelect>
                        </div>
                        <div class="col-span-full">
                            <label class="block mb-1">Id</label>
                            <BaseInput v-model="postForm.id" />
                        </div>

                        <div class="col-span-full">
                            <label class="block mb-1">Parts</label>
                            <BaseInput v-model="postForm.parts[0].id" />
                            <BaseInput v-model="postForm.parts[0].index" />
                            <BaseInput v-model="postForm.parts[0].colorindex" />
                            <BaseInput v-model="postForm.parts[0].type" />
                            <!-- <BaseCheckbox v-model="postForm.parts[0].colorable" /> -->
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
const postForm = ref({ type: 'ha', id: '', parts: [{ id: 0, type: 'ha', colorable: true, index: 0, colorindex: 0 }], file: { base64: '', name: '' } })

const handleFileUpload = (file: { base64: string; name: string }) => (postForm.value.file = file)

const submitPost = async () => {
    if (loading.value) return

    try {
        loading.value = true

        await useFetchAPI('UploadClothe', 'POST', { body: JSON.stringify(postForm.value) })

        showMessage('Le vêtement a bien été ajouté', false)

        postForm.value = { type: 'ha', id: '', parts: [{ id: 0, type: 'ha', colorable: true, index: 0, colorindex: 0 }], file: { base64: '', name: '' } }
    } catch (e) {
        console.error(e)
    }

    loading.value = false
}
</script>
