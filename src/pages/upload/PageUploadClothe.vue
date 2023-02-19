<template>
    <div class="grid grid-cols-1 gap-4 h-full">
        <div class="col-span-1">
            <BaseCard>
                <template #title>Importer un fichier (Vêtement)</template>
                <template #body>
                    <form @submit.prevent="submitPost" enctype="multipart/form-data" class="grid grid-cols-1 gap-3">
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
                                        <BaseTableColunm><IconClose @click="deletePart(part.id)" class="h-6 w-6 cursor-pointer hover:text-white" /></BaseTableColunm>
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
import { VNodeRef } from 'vue'

const loading = ref(false)
const postForm = ref({ type: 'ha', id: '', parts: [{ id: 0, type: 'ha', colorable: 0, index: 0, colorindex: 0 }], file: { base64: '', name: '' } })
const baseUploadFileRef = ref<VNodeRef | null>(null)
const categoryType = ref({ hr: 'hr', hd: 'hd', ch: 'ch', lg: 'lg', sh: 'sh', ha: 'ha', he: 'he', ea: 'ea', fa: 'fa', ca: 'ca', wa: 'wa', cc: 'cc', cp: 'cp' })

const addPart = () => {
    if (!postForm.value.parts.find((x) => x.id === 0)) postForm.value.parts.push({ id: 0, type: 'ha', colorable: 0, index: 0, colorindex: 0 })
}
const deletePart = (id: number) => (postForm.value.parts = postForm.value.parts.filter((x) => x.id !== id))
const handleFileUpload = (file: { base64: string; name: string }) => (postForm.value.file = file)

const submitPost = async () => {
    if (loading.value) return

    try {
        loading.value = true

        await useFetchAPI('UploadClothe', 'POST', { body: JSON.stringify(postForm.value) })

        showMessage('Le vêtement a bien été ajouté', false)

        postForm.value = { type: 'ha', id: '', parts: [{ id: 0, type: 'ha', colorable: 0, index: 0, colorindex: 0 }], file: { base64: '', name: '' } }

        baseUploadFileRef.value?.reset()
    } catch (e) {
        console.error(e)
    }

    loading.value = false
}
</script>
