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
        <BaseButton @click="addEmptyFile({ id: '', code: '', text: '' })">+ Ajouté</BaseButton>
        <BaseButton @click="saveAllfiles" :disabled="fileNeedSaveCount === 0" :loading="isLoading" class="relative">
          Sauvegarder <BaseBadge class="top-0 right-0 translate-x-1/2 -translate-y-1/2 absolute">{{ fileNeedSaveCount }}</BaseBadge>
        </BaseButton>
      </div>
    </div>
    <div class="col-span-1">
      <BaseCard>
        <template #title>Modifier texte (Badge)</template>
        <template #body>
          <BaseSpinner :loading="isLoading" v-if="isLoading" />
          <BaseTable>
            <template #head>
              <BaseTableHead>#</BaseTableHead>
              <BaseTableHead>Texte</BaseTableHead>
              <BaseTableHead>Action</BaseTableHead>
            </template>
            <template #body>
              <BaseTableBody v-for="file in filesPage" :key="file.keyIndex">
                <BaseTableColunm>
                  <BaseInput v-model="file.code" text-to-edit v-if="file.id === null"></BaseInput>
                  <div class="w-full px-4 py-2" v-else>{{ file.code }}</div>
                </BaseTableColunm>
                <BaseTableColunm>
                  <BaseInput v-model="file.text" text-to-edit @value-updated="addUpdateFileId(file)"></BaseInput>
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
const { isLoading, getFiles, addDeleteFileId, addEmptyFile, uploadFiles, saveAllfiles, filesPage, pageCount, pageId, pageSearch, deleteFileIds, addUpdateFileId, updateFileIds, fileNeedSaveCount, updatePageCurrent } = await useFetchData<ApiData>(
  '/api/text-badge'
)

interface ApiData {
  keyIndex?: number
  id: string
  code: string
  text: string
}
</script>
