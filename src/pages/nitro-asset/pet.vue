<template>
  <div class="grid grid-cols-1 gap-4">
    <div class="col-span-1">
      <label class="text-xl font-bold">Recherche</label>
      <BaseInput placeholder="Filter les resultats" v-model="pageSearch" :delay="500" />
    </div>
    <div class="col-span-1">
      <label class="text-xl font-bold">Importer des fichiers (.nitro)</label>
      <BaseUploadFile accept=".nitro" @upload="handleFileUpload" ref="baseUploadFileRef" multiple />
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
        <template #title>Nitro asset (Pet)</template>
        <template #body>
          <BaseSpinner :loading="isLoading" v-if="isLoading" />
          <BaseTable>
            <template #head>
              <BaseTableHead>Lien</BaseTableHead>
              <BaseTableHead>Action</BaseTableHead>
            </template>
            <template #body>
              <BaseTableBody v-for="file in filesPage" :key="file.keyIndex" :is-updated="updateFileIds.includes(file.keyIndex || 0)">
                <BaseTableColunm>
                  <div class="w-full px-4 py-2">
                    <a :href="file.link" target="_blank" class="hover:underline hover:text-white">{{ file.link }}</a>
                  </div>
                </BaseTableColunm>
                <BaseTableColunm>
                  <div class="flex flex-col items-center justify-around w-full px-4 py-2">
                    <div class="cursor-pointer hover:underline hover:text-white" @click="navigateTo({ path: '/nitro/extract', query: { url: file.link } })">Extraire</div>
                    <div class="cursor-pointer hover:underline hover:text-white" @click="navigateTo({ path: '/nitro/preview', query: { url: file.link } })">Aperçu</div>
                    <div class="cursor-pointer hover:underline hover:text-white" @click="navigateTo({ path: '/nitro/rename', query: { url: file.link } })">Renommer</div>
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
const { isLoading, getFiles, filesPage, pageCount, pageId, pageSearch, updateFileIds, updatePageCurrent, saveAllfiles, fileNeedSaveCount, uploadFiles } = await useFetchData<ApiData>('/api/asset/pet', true)

const getFileName = (url: string) => url.split('/').pop()?.split('.').slice(0, -1).join('.') || ''

const fileUploads = ref<{ base64: string; name: string }[]>([])
const handleFileUpload = (files: { base64: string; name: string }[]) => (fileUploads.value = files)

interface ApiData {
  keyIndex?: number
  id: string
  link: string
}
</script>
