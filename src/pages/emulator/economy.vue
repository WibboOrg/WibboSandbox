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
        <BaseButton @click="addEmptyFile({ id: -1, categoryId: 0, itemId: 0, extraData: '', averagePrice: 0 })">+ Ajouté</BaseButton>
        <BaseButton @click="saveAllfiles" :disabled="fileNeedSaveCount === 0" :loading="isLoading" class="relative">
          Sauvegarder <BaseBadge class="top-0 right-0 translate-x-1/2 -translate-y-1/2 absolute">{{ fileNeedSaveCount }}</BaseBadge>
        </BaseButton>
      </div>
    </div>
    <div class="col-span-1">
      <BaseCard>
        <template #title>Modifier emulateur (Economie)</template>
        <template #body>
          <BaseSpinner :loading="isLoading" v-if="isLoading" />
          <BaseTable>
            <template #head>
              <BaseTableHead>#</BaseTableHead>
              <BaseTableHead>Catégorie</BaseTableHead>
              <BaseTableHead>Objet id</BaseTableHead>
              <BaseTableHead>extra data</BaseTableHead>
              <BaseTableHead>Prix moyen</BaseTableHead>
              <BaseTableHead>Action</BaseTableHead>
            </template>
            <template #body>
              <BaseTableBody v-for="file in filesPage" :key="file.keyIndex" :is-updated="updateFileIds.includes(file.keyIndex || 0) || file.id <= -1" :is-deleted="deleteFileIds.includes(file.keyIndex || 0)">
                <BaseTableColunm>
                  <div class="w-full px-4 py-2">{{ file.id }}</div>
                </BaseTableColunm>
                <BaseTableColunm>
                  <BaseInput v-model="file.categoryId" text-to-edit @value-updated="addUpdateFileId(file)" number></BaseInput>
                </BaseTableColunm>
                <BaseTableColunm>
                  <BaseInput v-model="file.itemId" text-to-edit @value-updated="addUpdateFileId(file)" number></BaseInput>
                </BaseTableColunm>
                <BaseTableColunm>
                  <BaseInput v-model="file.extraData" text-to-edit @value-updated="addUpdateFileId(file)"></BaseInput>
                </BaseTableColunm>
                <BaseTableColunm>
                  <BaseInput v-model="file.averagePrice" text-to-edit @value-updated="addUpdateFileId(file)" number></BaseInput>
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
const { isLoading, saveAllfiles, getFiles, addEmptyFile, addUpdateFileId, addDeleteFileId, filesPage, pageCount, pageId, pageSearch, updatePageCurrent, fileNeedSaveCount, deleteFileIds, updateFileIds } = await useFetchData<ApiData>(
  '/api/emulator-economy'
)

interface ApiData {
  keyIndex?: number
  id: number
  categoryId: number
  itemId: number
  extraData: string
  averagePrice: number
}
</script>
