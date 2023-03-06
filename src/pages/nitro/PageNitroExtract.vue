<template>
    <div class="grid grid-cols-1 gap-4">
        <div class="col-span-1">
            <BaseCard>
                <template #title>Extraire un fichier Nitro</template>
                <template #body>
                    <form @submit.prevent="submitPost" enctype="multipart/form-data" class="grid grid-cols-4 gap-3">
                        <div class="col-span-full">
                            <label class="block mb-1">Fichier (.nitro)</label>
                            <BaseUploadFile accept="image/nitro" @upload="handleFileUpload" ref="baseUploadFileRef" />
                        </div>

                        <div class="col-span-full">
                            <label class="block mb-1">Url (.nitro)</label>
                            <BaseInput v-model="postForm.url" />
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
import { NitroBundle, ArrayBufferToBase64, Base64ToArrayBuffer, IAssetData } from '../../utils'

const route = useRoute()
const loading = ref(false)
const postForm = ref({ url: '', file: { base64: '', name: '' } })
const baseUploadFileRef = ref<VNodeRef | null>(null)
const nitroImage = ref<string>('')
const nitroJson = ref<IAssetData | null>(null)

onMounted(() => {
    watch(
        () => route.query.url,
        () => (postForm.value.url = route.query.url?.toString() || ''),
        { immediate: true },
    )
})

const handleFileUpload = (file: { base64: string; name: string }) => (postForm.value.file = file)

const submitPost = async () => {
    if (loading.value) return

    if (postForm.value.file.name === '' && postForm.value.url === '') {
        showMessage({ message: 'Vous devez mettre un fichier .nitro' })
        return
    }

    try {
        loading.value = true

        let nitroBuffer: ArrayBuffer | null = null
        if (postForm.value.url !== '') {
            nitroBuffer = await (await fetch(postForm.value.url)).arrayBuffer()
        } else {
            nitroBuffer = Base64ToArrayBuffer(postForm.value.file.base64).buffer
        }

        if (nitroBuffer == null) {
            showMessage({ message: 'Une erreur est survenu' })
            return
        }

        const bundled = new NitroBundle()
        bundled.parse(nitroBuffer)

        for (const file of Object.entries(bundled.files)) {
            const fileName = file[0]
            const fileBuffer = file[1]

            if (fileName.endsWith('.json')) {
                nitroJson.value = JSON.parse(NitroBundle.TEXT_DECODER.decode(fileBuffer))
            } else {
                nitroImage.value = 'data:image/png;base64,' + ArrayBufferToBase64(fileBuffer)
            }
        }

        await downloadNitro()

        postForm.value = { url: '', file: { base64: '', name: '' } }

        baseUploadFileRef.value?.reset()
    } catch (e) {
        console.error(e)
    }

    loading.value = false
}

const downloadNitro = async () => {
    const nitroFileName = nitroJson.value?.name ?? ''

    if (nitroFileName === '') {
        showMessage({ message: 'Une erreur est survenu' })
        return
    }

    const jsonString = JSON.stringify(nitroJson.value)

    const downloadLink = document.createElement('a')

    downloadLink.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonString)
    downloadLink.download = nitroFileName + '.json'
    downloadLink.click()

    downloadLink.href = nitroImage.value
    downloadLink.download = nitroFileName + '.png'
    downloadLink.click()
}
</script>
