<template>
  <div class="grid grid-cols-1 gap-4">
    <div class="col-span-1">
      <label class="text-xl font-bold">Recherche</label>
      <BaseInput placeholder="Filter les resultats" v-model="pageSearch" :delay="500" />
    </div>
    <div class="col-span-1">
      <label class="text-xl font-bold">Importer des fichiers (.png)</label>
      <BaseUploadFile accept="image/png" @upload="handleFileUpload" ref="baseUploadFileRef" multiple />
      <BaseButton @click="uploadFiles(fileUploads).then(() => baseUploadFileRef?.reset())">Importer</BaseButton>
    </div>
    <div class="col-span-1 sticky top-0 z-10 backdrop-blur">
      <label class="text-xl font-bold">Choisir une option</label>
      <div class="flex flex-row gap-2 mt-2">
        <BaseButton @click="getFiles">Recharger la page</BaseButton>
        <BaseButton @click="saveAllfiles" :disabled="fileNeedSaveCount === 0" :loading="isLoading" class="relative">
          Sauvegarder <BaseBadge class="top-0 right-0 translate-x-1/2 -translate-y-1/2 absolute">{{ fileNeedSaveCount }}</BaseBadge>
        </BaseButton>
      </div>
    </div>
    <div class="col-span-1">
      <BaseCard>
        <template #title>Asset (Reception)</template>
        <template #body>
          <BaseSpinner :loading="isLoading" v-if="isLoading" />
          <BaseTable>
            <template #head>
              <BaseTableHead>Image</BaseTableHead>
              <BaseTableHead>Lien</BaseTableHead>
              <BaseTableHead>Action</BaseTableHead>
            </template>
            <template #body>
              <BaseTableBody v-for="file in filesPage" :key="file.keyIndex" :is-updated="updateFileIds.includes(file.keyIndex || 0) || file.id === null" :is-deleted="deleteFileIds.includes(file.keyIndex || 0)">
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
                    <IconClose @click="addDeleteFileId(file)" class="h-6 w-6 cursor-pointer hover:text-white" />
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
import type { LazyBaseUploadFile } from '#build/components'

const baseUploadFileRef = ref<InstanceType<typeof LazyBaseUploadFile> | null>(null)
const { isLoading, getFiles, addDeleteFileId, addEmptyFile, uploadFiles, saveAllfiles, filesPage, pageCount, pageId, pageSearch, deleteFileIds, addUpdateFileId, updateFileIds, fileNeedSaveCount, updatePageCurrent } = await useFetchData<ApiData>(
  '/api/asset/reception',
  true
)

const fileUploads = ref<{ base64: string; name: string }[]>([])
const handleFileUpload = (files: { base64: string; name: string }[]) => (fileUploads.value = files)

interface ApiData {
  keyIndex?: number
  id: string
  link: string
}
</script>
