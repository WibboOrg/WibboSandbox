<template>
    <div class="grid grid-cols-1 gap-4 h-full">
        <div class="col-span-1">
            <BaseCard>
                <template #title>Importer des mobiliers</template>
                <template #body>
                    <label class="relative flex flex-col w-full overflow-hidden border-4 border-blue-200 border-solid cursor-pointer hover:animate-pulse">
                        <div class="flex flex-col items-center justify-center p-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                key="logo"
                                v-if="uploadForm.files == null"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <p class="px-2 pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">Importer des fichier</p>
                        </div>

                        <input type="file" class="opacity-0" accept=".nitro" multiple ref="upload" @change="onUploadChange()" hidden />
                    </label>

                    <ul class="flex flex-col gap-1 px-2 overflow-y-overlay max-h-32" v-if="uploadForm.files.length">
                        <li v-for="(file, index) in uploadForm.files" :key="'file' + index" class="flex justify-between p-2 rounded even:bg-gray-700 odd:bg-gray-800">
                            {{ file.name }}
                            <div class="cursor-pointer" @click="removeUpload(file.name)">
                                <IconClose class="w-6 h-6" />
                            </div>
                        </li>
                    </ul>
                    <button class="w-full p-2 text-center transition-colors border-2 border-gray-700 cursor-pointer hover:bg-gray-600" @click.prevent="postUpload">Importer</button>
                </template>
            </BaseCard>
        </div>
    </div>
</template>

<script lang="ts" setup>
const { notifications, isError } = useNotification()

const uploadForm = ref<{ files: { name: string; file: File }[] }>({
    files: [],
})
const loading = ref(false)
const upload = ref<HTMLInputElement>()

const postUpload = async () => {
    if (loading.value) {
        return
    }

    if (uploadForm.value.files.length == 0) {
        isError.value = true
        notifications.value.push('Aucun fichier à importer')
        return
    }

    const formData = new FormData()
    for (const file of uploadForm.value.files.slice(0, 20)) {
        formData.append('file[]', file.file)
    }

    try {
        loading.value = true

        await useFetchAPI('uploadfurni', 'POST', formData)
        isError.value = false
        notifications.value.push('Fichiers importés')
    } catch (e: unknown) {
        console.error(e)
    }

    loading.value = false
}

const onUploadChange = () => {
    const files = upload.value?.files

    if (!files) return

    for (const file of Array.from(files)) {
        if (uploadForm.value.files.filter((f) => f.name === file.name).length !== 0) {
            uploadForm.value.files = uploadForm.value.files.filter((f) => f.name !== file.name)
        }

        uploadForm.value.files.push({ name: file.name, file: file })
    }

    if (uploadForm.value.files.length > 20) {
        uploadForm.value.files = uploadForm.value.files.slice(0, 20)
    }
}

const removeUpload = (name: string) => {
    uploadForm.value.files = uploadForm.value.files.filter((f) => f.name !== name)
}
</script>
