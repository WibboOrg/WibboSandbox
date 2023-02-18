<template>
    <div class="grid grid-cols-1 gap-4">
        <div class="col-span-1">
            <BaseCard>
                <template #title>Voir un fichier Nitro</template>
                <template #body>
                    <form @submit.prevent="submitPost" enctype="multipart/form-data" class="grid grid-cols-1 gap-3">
                        <div class="col-span-full">
                            <label class="block mb-1">Fichier (.nitro)</label>
                            <BaseUploadFile accept="image/nitro" @upload="handleFileUpload" ref="baseUploadFileRef" />
                        </div>

                        <div class="col-span-full">
                            <BaseButton primary :loading="loading">Importer</BaseButton>
                        </div>
                    </form>
                </template>
            </BaseCard>
        </div>
        <div class="col-span-1" v-if="nitroJson">
            <BaseCard>
                <template #title>Information fichier Nitro</template>
                <template #body>
                    <div class="grid grid-cols-4 gap-3">
                        <div class="col-span-1" v-if="nitroJson?.name">
                            <label class="block mb-1 font-bold">Nom:</label>
                            <span>{{ nitroJson.name }}</span>
                        </div>
                        <div class="col-span-1" v-if="nitroJson?.type">
                            <label class="block mb-1 font-bold">Type:</label>
                            <span>{{ nitroJson.type }}</span>
                        </div>
                        <div class="col-span-1" v-if="nitroJson?.visualizationType">
                            <label class="block mb-1 font-bold">VisualizationType:</label>
                            <span>{{ nitroJson.visualizationType }}</span>
                        </div>
                        <div class="col-span-1" v-if="nitroJson?.logicType">
                            <label class="block mb-1 font-bold">LogicType:</label>
                            <span>{{ nitroJson.logicType }}</span>
                        </div>
                    </div>
                </template>
            </BaseCard>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { VNodeRef } from 'vue'
import { NitroBundle, ArrayBufferToBase64, Base64ToArrayBuffer, IAssetData } from '../../utils'

const loading = ref(false)
const postForm = ref({ file: { base64: '', name: '' } })
const baseUploadFileRef = ref<VNodeRef | null>(null)
const nitroImage = ref<string>('')
const nitroJson = ref<IAssetData | null>(null)

const handleFileUpload = (file: { base64: string; name: string }) => (postForm.value.file = file)

const submitPost = async () => {
    if (loading.value) return

    if (postForm.value.file.name === '') {
        showMessage('Vous devez mettre un fichier .nitro', true)
        return
    }

    try {
        loading.value = true

        const nitroBuffer = Base64ToArrayBuffer(postForm.value.file.base64)

        const bundled = new NitroBundle()
        bundled.parse(nitroBuffer.buffer)

        for (const file of Object.entries(bundled.files)) {
            const fileName = file[0]
            const fileBuffer = file[1]

            if (fileName.endsWith('.json')) {
                nitroJson.value = JSON.parse(NitroBundle.TEXT_DECODER.decode(fileBuffer))
            } else {
                nitroImage.value = 'data:image/png;base64,' + ArrayBufferToBase64(fileBuffer)
            }
        }

        postForm.value = { file: { base64: '', name: '' } }

        baseUploadFileRef.value?.reset()
    } catch (e) {
        console.error(e)
    }

    loading.value = false
}
</script>
