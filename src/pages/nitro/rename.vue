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
                            <label class="block mb-1">Url (.nitro)</label>
                            <BaseInput v-model="postForm.url" />
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
    </div>
</template>

<script lang="ts" setup>
import { VNodeRef } from 'vue'
import { NitroBundle, ArrayBufferToBase64, Base64ToArrayBuffer, IAssetData } from '../../utils'

const { showMessage } = useNotification()
const route = useRoute()

const loading = ref(false)
const postForm = ref({ url: '', name: '', file: { base64: '', name: '' } })
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

    if (postForm.value.file.name === '') {
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

        if (postForm.value.name === '') {
            postForm.value.name = nitroJson.value?.name ?? ''
        }

        await downloadNitro()

        postForm.value = { url: '', name: '', file: { base64: '', name: '' } }

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

    const jsonString = JSON.stringify(nitroJson.value).replaceAll(nitroFileName, postForm.value.name)

    const newBundled = new NitroBundle()
    newBundled.addFile(postForm.value.name + '.json', NitroBundle.TEXT_ENCODER.encode(jsonString))
    newBundled.addFile(postForm.value.name + '.png', Base64ToArrayBuffer(nitroImage.value))

    const nitroBuffer = await newBundled.toBufferAsync()

    const downloadLink = document.createElement('a')
    downloadLink.href = 'data:application/octet-binary;base64,' + ArrayBufferToBase64(nitroBuffer)
    downloadLink.download = postForm.value.name + '.nitro'
    downloadLink.click()
}
</script>
