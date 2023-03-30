<template>
    <div class="grid grid-cols-1 gap-4">
        <div class="col-span-1">
            <label class="text-xl font-bold">Recherche</label>
            <BaseInput placeholder="Filter les resultats" v-model="pageSearch" :delay="500" />
        </div>
        <div class="col-span-1">
            <label class="text-xl font-bold">Importer un fichier (.png)</label>
            <BaseUploadFile accept="image/png" @upload="handleFileUpload" ref="baseUploadFileRef" />
            <BaseButton @click="importFile(fileUpload).then(() => baseUploadFileRef?.reset())">Importer</BaseButton>
        </div>
        <div class="col-span-1">
            <label class="text-xl font-bold">Choisir une option</label>
            <div class="flex flex-row gap-2 mt-2">
                <BaseButton @click="getFiles">Recharger la page</BaseButton>
            </div>
        </div>
        <div class="col-span-1">
            <BaseCard>
                <template #title>Asset (Icon mobilier)</template>
                <template #body>
                    <BaseSpinner :loading="isLoading" v-if="isLoading" />
                    <BaseTable>
                        <template #head>
                            <BaseTableHead>Image</BaseTableHead>
                            <BaseTableHead>Lien</BaseTableHead>
                            <BaseTableHead>Action</BaseTableHead>
                        </template>
                        <template #body>
                            <BaseTableBody v-for="file in filesPage" :key="file.id">
                                <BaseTableColunm>
                                    <img :src="file.link" class="max-w-12 max-h-12" loading="lazy" />
                                </BaseTableColunm>
                                <BaseTableColunm>
                                    <div class="w-full px-4 py-2">
                                        <a :href="file.link" target="_blank" class="hover:underline hover:text-white">{{ file.link }}</a>
                                    </div>
                                </BaseTableColunm>
                                <BaseTableColunm>
                                    <div class="flex justify-around items-center w-full px-4 py-2">
                                        <IconClose @click="deleteFile(file.id)" class="h-6 w-6 cursor-pointer hover:text-white" />
                                    </div>
                                </BaseTableColunm>
                            </BaseTableBody>
                        </template>
                    </BaseTable>
                    <BasePagination :page-id="pageId" :page-count="pageCount" @pageCurrent="updatePageCurrent" class="float-right" />
                </template>
            </BaseCard>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { VNodeRef } from 'vue'

const baseUploadFileRef = ref<VNodeRef | null>(null)
const { isLoading, deleteFile, getFiles, importFile, filesPage, pageCount, pageId, pageSearch, updatePageCurrent } = useFetchData<ApiData>('/api/asset/icons', true)

const fileUpload = ref({ file: { base64: '', name: '' } })
const handleFileUpload = (file: { base64: string; name: string }) => (fileUpload.value.file = file)

interface ApiData {
    id: string
    link: string
}
</script>
