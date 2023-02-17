<template>
    <div class="grid grid-cols-1 gap-4">
        <div class="col-span-1">
            <BaseCard>
                <template #title>Renommer un fichier Nitro</template>
                <template #body>
                    <form @submit.prevent="submitPost" enctype="multipart/form-data" class="grid grid-cols-1 gap-3">
                        <div class="col-span-full">
                            <label class="block mb-1">Fichier (.nitro)</label>
                            <BaseUploadFile accept="image/nitro" @upload="handleFileUpload" ref="baseUploadFileRef" />
                        </div>

                        <div class="col-span-full">
                            <label class="block mb-1">Nouveau nom</label>
                            <BaseInput v-model="postForm.name"></BaseInput>
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

                        <div class="col-span-full">
                            <BaseButton @click="downloadNitro(true)" class="mb-2">Télécharger assets</BaseButton>
                            <BaseButton @click="downloadNitro()">Télécharger nitro</BaseButton>
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
const postForm = ref({ name: '', file: { base64: '', name: '' } })
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

        if (postForm.value.name === '') {
            postForm.value.name = nitroJson.value?.name ?? ''
        }

        // postForm.value = { name: '', file: { base64: '', name: '' } }

        // baseUploadFileRef.value?.reset()
    } catch (e) {
        console.error(e)
    }

    loading.value = false
}

const downloadNitro = async (assets = false) => {
    const nitroFileName = nitroJson.value?.name ?? ''

    if (nitroFileName === '') {
        showMessage('Une erreur est survenu', true)
        return
    }

    const jsonString = JSON.stringify(nitroJson.value).replaceAll(nitroFileName, postForm.value.name)

    const newBundled = new NitroBundle()
    newBundled.addFile(postForm.value.name + '.json', NitroBundle.TEXT_ENCODER.encode(jsonString))
    newBundled.addFile(postForm.value.name + '.png', Base64ToArrayBuffer(nitroImage.value))

    const nitroBuffer = await newBundled.toBufferAsync()

    const downloadLink = document.createElement('a')
    if (!assets) {
        downloadLink.href = 'data:application/octet-binary;base64,' + ArrayBufferToBase64(nitroBuffer)
        downloadLink.download = postForm.value.name + '.nitro'
        downloadLink.click()
    } else {
        downloadLink.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonString)
        downloadLink.download = postForm.value.name + '.json'
        downloadLink.click()

        downloadLink.href = nitroImage.value
        downloadLink.download = postForm.value.name + '.png'
        downloadLink.click()
    }
}
</script>
