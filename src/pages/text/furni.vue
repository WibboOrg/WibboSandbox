<template>
  <div class="grid grid-cols-1 gap-4">
    <div class="col-span-1">
      <label class="text-xl font-bold">Recherche</label>
      <BaseInput placeholder="Filter les resultats" v-model="pageSearch" :delay="500" />
    </div>
    <div class="col-span-1 sticky top-0 z-10 backdrop-blur">
      <label class="text-xl font-bold">Choisir une option</label>
      <div class="flex flex-row gap-2 mt-2">
        <BaseButton @click="getFiles">Recharger la page</BaseButton>
        <BaseButton @click="addEmptyFile({ id: -1, classname: '', name: '', description: '', type: 's' })">+ Ajouté</BaseButton>
        <BaseButton @click="saveAllfiles" :disabled="fileNeedSaveCount === 0" :loading="isLoading" class="relative">
          Sauvegarder <BaseBadge class="top-0 right-0 translate-x-1/2 -translate-y-1/2 absolute">{{ fileNeedSaveCount }}</BaseBadge>
        </BaseButton>
      </div>
    </div>
    <div class="col-span-1">
      <BaseCard>
        <template #title>Modifier texte (Mobilier)</template>
        <template #body>
          <BaseSpinner :loading="isLoading" v-if="isLoading" />
          <BaseTable>
            <template #head>
              <BaseTableHead>#</BaseTableHead>
              <BaseTableHead>Nom</BaseTableHead>
              <BaseTableHead>Texte</BaseTableHead>
              <BaseTableHead>Type</BaseTableHead>
              <BaseTableHead>Action</BaseTableHead>
            </template>
            <template #body>
              <BaseTableBody v-for="file in filesPage" :key="file.keyIndex" :is-updated="updateFileIds.includes(file.keyIndex || 0) || file.id === null" :is-deleted="deleteFileIds.includes(file.keyIndex || 0)">
                <BaseTableColunm>
                  <div class="w-full px-4 py-2 flex gap-2"><img :src="urlAssets + getFurnitureIconPath(file.classname)" class="max-w-6 max-h-6" loading="lazy" /> {{ file.classname }} ({{ file.id }})</div>
                </BaseTableColunm>
                <BaseTableColunm><BaseInput v-model="file.name" text-to-edit @value-updated="addUpdateFileId(file)"></BaseInput></BaseTableColunm>
                <BaseTableColunm>
                  <BaseInput v-model="file.description" text-to-edit @value-updated="addUpdateFileId(file)"></BaseInput>
                </BaseTableColunm>
                <BaseTableColunm>
                  <div class="w-full px-4 py-2">{{ file.type }}</div>
                </BaseTableColunm>
                <BaseTableColunm>
                  <div class="flex items-center justify-around w-full px-4 py-2">
                    <IconClose @click="addDeleteFileId(file)" class="w-6 h-6 cursor-pointer hover:text-white" />
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
const { isLoading, addEmptyFile, getFiles, addDeleteFileId, saveAllfiles, addUpdateFileId, updateFileIds, filesPage, pageCount, pageId, pageSearch, deleteFileIds, fileNeedSaveCount, updatePageCurrent } = await useFetchData<ApiData>('/api/text-furni')

const { urlAssets } = useRuntimeConfig().public

interface ApiData {
  keyIndex?: number
  id: number
  classname: string
  name: string
  description: string
  type: 's' | 'i'
}
</script>
