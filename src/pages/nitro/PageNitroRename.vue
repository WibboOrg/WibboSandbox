<template>
    <div class="grid grid-cols-1 gap-4 h-full">
        <div class="col-span-1">
            <BaseCard>
                <template #title>Renommé un fichier Nitro</template>
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
    </div>
</template>

<script lang="ts" setup>
import { VNodeRef } from 'vue'
import { NitroBundle } from '../../utils/NitroBundle'

const loading = ref(false)
const postForm = ref({ name: '', file: { base64: '', name: '' } })
const baseUploadFileRef = ref<VNodeRef | null>(null)

const handleFileUpload = (file: { base64: string; name: string }) => (postForm.value.file = file)

const bundled = new NitroBundle()

const submitPost = async () => {
    if (loading.value) return

    if (postForm.value.name === '') {
        showMessage('Vous devez mettre un nouveau nom', true)
        return
    }

    if (postForm.value.file.name === '') {
        showMessage('Vous devez mettre un fichier .nitro', true)
        return
    }

    try {
        loading.value = true

        const fileName = postForm.value.file.name.split('.nitro')[0]

        const dataUrl = 'data:application/octet-binary;base64,' + postForm.value.file.base64

        const res = await fetch(dataUrl)
        const binaryNitro = await res.arrayBuffer()

        bundled.parse(binaryNitro)
        bundled.changeName(fileName, postForm.value.name)

        downloadNitro(postForm.value.name)

        postForm.value = { name: '', file: { base64: '', name: '' } }

        baseUploadFileRef.value?.reset()
    } catch (e) {
        console.error(e)
    }

    loading.value = false
}

const generateLink = (binary: ArrayBuffer) => {
    const bytes = Array.from(new Uint8Array(binary))

    const base64StringFile = btoa(bytes.map((item) => String.fromCharCode(item)).join(''))

    return 'data:application/octet-binary;base64,' + base64StringFile
}

const downloadNitro = async (name: string) => {
    const binary = await bundled.toBufferAsync()

    const linkSource = generateLink(binary)

    const downloadLink = document.createElement('a')
    downloadLink.href = linkSource
    downloadLink.download = name + '.nitro'
    downloadLink.click()
}
</script>
