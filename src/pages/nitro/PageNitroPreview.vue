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
        <div class="col-span-1" v-if="nitroJson">
            <BaseCard>
                <template #title>Image Nitro</template>
                <template #body>
                    <div class="grid grid-cols-4 gap-3">
                        <div v-for="image in nitroImagesUrl" :key="image.name" class="col-span-1">
                            <label class="block mb-1 font-bold">{{ image.name }}</label>
                            <img :src="image.base64" />
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

const route = useRoute()
const loading = ref(false)
const postForm = ref({ url: '', file: { base64: '', name: '' } })
const baseUploadFileRef = ref<VNodeRef | null>(null)
const nitroImage = ref<string>('')
const nitroImagesUrl = ref<{ name: string; base64: string }[]>([])
const nitroJson = ref<IAssetData | null>(null)

onMounted(() => {
    watch(
        () => route.query.url,
        () => {
            postForm.value.url = route.query.url?.toString() || ''
            if (postForm.value.url !== '') submitPost()
        },
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

        nitroImagesUrl.value = []

        const image = new Image()
        image.onload = () => extractImage(image)
        image.src = nitroImage.value

        postForm.value = { url: '', file: { base64: '', name: '' } }

        baseUploadFileRef.value?.reset()
    } catch (e) {
        console.error(e)
    }

    loading.value = false
}

const extractImage = (image: HTMLImageElement) => {
    const frames = nitroJson.value?.spritesheet?.frames
    if (!frames) return

    for (const entry of Object.entries(frames)) {
        const name = entry[0]
        const frame = entry[1]

        const rect = frame.frame
        const sourceSize = frame.trimmed && frame.sourceSize ? frame.sourceSize : frame.frame

        let reactFrame = null
        let trim = null

        const orig = {
            x: 0,
            y: 0,
            w: sourceSize.w,
            h: sourceSize.h,
        }

        if (frame.rotated) {
            reactFrame = {
                x: rect.x,
                y: rect.y,
                w: rect.h,
                h: rect.w,
            }
        } else {
            reactFrame = {
                x: rect.x,
                y: rect.y,
                w: rect.w,
                h: rect.h,
            }
        }
        if (frame.trimmed && frame.spriteSourceSize) {
            trim = {
                x: frame.spriteSourceSize.x,
                y: frame.spriteSourceSize.y,
                w: rect.w,
                h: rect.h,
            }
        }

        const width = reactFrame.w
        const height = reactFrame.h

        let dx = 0
        let dy = 0

        if (trim) {
            dx = trim.w / 2 + trim.x - 0 * orig.w
            dy = trim.h / 2 + trim.y - 0 * orig.h
        } else {
            dx = (0.5 - 0) * orig.w
            dy = (0.5 - 0) * orig.h
        }

        dx -= width / 2
        dy -= height / 2

        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        canvas.width = orig.w
        canvas.height = orig.h
        context?.drawImage(image, reactFrame.x, reactFrame.y, reactFrame.w, reactFrame.h, dx, dy, reactFrame.w, reactFrame.h)

        const base64 = canvas.toDataURL()
        nitroImagesUrl.value = [...nitroImagesUrl.value, { name, base64 }]
    }
}
</script>
