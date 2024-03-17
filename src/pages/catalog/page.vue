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
        <BaseButton @click="fullEdit = !fullEdit">Afficher tout</BaseButton>
        <BaseButton @click="addEmptyFile(defaultValue)">+ Ajouté</BaseButton>
        <BaseButton @click="saveAllfiles" :disabled="fileNeedSaveCount === 0" :loading="isLoading" class="relative">
          Sauvegarder <BaseBadge class="top-0 right-0 translate-x-1/2 -translate-y-1/2 absolute">{{ fileNeedSaveCount }}</BaseBadge>
        </BaseButton>
      </div>
    </div>
    <div class="col-span-1">
      <BaseCard>
        <template #title>Modifier catalogue (Page)</template>
        <template #body>
          <BaseSpinner :loading="isLoading" v-if="isLoading" />
          <BaseTable>
            <template #head>
              <BaseTableHead>#</BaseTableHead>
              <BaseTableHead>Parent Id</BaseTableHead>
              <BaseTableHead>Titre</BaseTableHead>
              <BaseTableHead>Icon Image</BaseTableHead>
              <BaseTableHead v-if="fullEdit">Activer</BaseTableHead>
              <BaseTableHead>Permission</BaseTableHead>
              <BaseTableHead>Ordre id</BaseTableHead>
              <BaseTableHead>Layout</BaseTableHead>
              <BaseTableHead v-if="fullEdit">Texte 1</BaseTableHead>
              <BaseTableHead v-if="fullEdit">Texte 2</BaseTableHead>
              <BaseTableHead>Premium</BaseTableHead>
              <BaseTableHead>Action</BaseTableHead>
            </template>
            <template #body>
              <BaseTableBody v-for="file in filesPage" :key="file.keyIndex" :is-updated="updateFileIds.includes(file.keyIndex || 0) || file.id <= -1" :is-deleted="deleteFileIds.includes(file.keyIndex || 0)">
                <BaseTableColunm>
                  <div class="w-full px-4 py-2">
                    {{ file.id }}
                    <div @click="navigateTo({ path: '/catalog/item', query: { pageId: file.id } })" class="cursor-pointer whitespace-nowrap hover:underline hover:text-white">Editer object</div>
                    <div @click="navigateTo({ path: '/catalog/item-base', query: { pageId: file.id } })" class="cursor-pointer whitespace-nowrap hover:underline hover:text-white">Editer config</div>
                  </div>
                </BaseTableColunm>
                <BaseTableColunm><BaseInput v-model="file.parentId" text-to-edit number @value-updated="addUpdateFileId(file)"></BaseInput></BaseTableColunm>
                <BaseTableColunm><BaseInput v-model="file.caption" text-to-edit @value-updated="addUpdateFileId(file)"></BaseInput></BaseTableColunm>
                <BaseTableColunm><BaseInput v-model="file.iconImage" text-to-edit number @value-updated="addUpdateFileId(file)"></BaseInput></BaseTableColunm>
                <BaseTableColunm v-if="fullEdit"><BaseInput v-model="file.enabled" text-to-edit boolean @value-updated="addUpdateFileId(file)"></BaseInput></BaseTableColunm>
                <BaseTableColunm><BaseInput v-model="file.requiredRight" text-to-edit @value-updated="addUpdateFileId(file)"></BaseInput></BaseTableColunm>
                <BaseTableColunm><BaseInput v-model="file.orderNum" text-to-edit number @value-updated="addUpdateFileId(file)"></BaseInput></BaseTableColunm>
                <BaseTableColunm><BaseInput v-model="file.pageLayout" text-to-edit @value-updated="addUpdateFileId(file)"></BaseInput></BaseTableColunm>
                <BaseTableColunm v-if="fullEdit"><BaseInput v-model="file.pageStrings1" text-to-edit @value-updated="addUpdateFileId(file)"></BaseInput></BaseTableColunm>
                <BaseTableColunm v-if="fullEdit"><BaseInput v-model="file.pageStrings2" text-to-edit @value-updated="addUpdateFileId(file)"></BaseInput></BaseTableColunm>
                <BaseTableColunm><BaseInput v-model="file.isPremium" text-to-edit boolean @value-updated="addUpdateFileId(file)"></BaseInput></BaseTableColunm>
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
const { isLoading, getFiles, addDeleteFileId, addEmptyFile, saveAllfiles, filesPage, pageCount, pageId, pageSearch, deleteFileIds, addUpdateFileId, updateFileIds, fileNeedSaveCount, updatePageCurrent } = await useFetchData<ApiData>(
  '/api/catalog-page'
)

const fullEdit = ref(false)

const defaultValue: ApiData = {
  id: -1,
  parentId: -1,
  caption: '',
  iconImage: 1,
  enabled: true,
  requiredRight: '',
  orderNum: 1,
  pageLayout: 'default_3x3',
  pageStrings1: 'wibbo|catalog_base',
  pageStrings2: '',
  isPremium: false
}

interface ApiData {
  keyIndex?: number
  id: number
  parentId: number
  caption: string
  iconImage: number
  enabled: boolean
  requiredRight: string
  orderNum: number
  pageLayout: string
  pageStrings1: string
  pageStrings2: string
  isPremium: boolean
}
</script>
