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
        <BaseButton @click="addEmptyFile(defaultFile)">+ Ajouté</BaseButton>
        <BaseButton @click="saveAllfiles" :disabled="fileNeedSaveCount === 0" :loading="isLoading" class="relative">
          Sauvegarder <BaseBadge class="top-0 right-0 translate-x-1/2 -translate-y-1/2 absolute">{{ fileNeedSaveCount }}</BaseBadge>
        </BaseButton>
      </div>
    </div>
    <div class="col-span-1">
      <BaseCard>
        <template #title>Modifier catalogue (Object configuration)</template>
        <template #body>
          <BaseSpinner :loading="isLoading" v-if="isLoading" />
          <BaseTable>
            <template #head>
              <BaseTableHead>#</BaseTableHead>
              <BaseTableHead v-if="fullEdit">Type</BaseTableHead>
              <BaseTableHead>Nom</BaseTableHead>
              <BaseTableHead>Largeur</BaseTableHead>
              <BaseTableHead>Longueur</BaseTableHead>
              <BaseTableHead>Hauteur</BaseTableHead>
              <BaseTableHead v-if="fullEdit">Empilable</BaseTableHead>
              <BaseTableHead v-if="fullEdit">Assayable</BaseTableHead>
              <BaseTableHead v-if="fullEdit">Marchable</BaseTableHead>
              <BaseTableHead>Interaction type</BaseTableHead>
              <BaseTableHead>Interaction clique</BaseTableHead>
              <BaseTableHead v-if="fullEdit">Vending</BaseTableHead>
              <BaseTableHead v-if="fullEdit">Hauteur adjustable</BaseTableHead>
              <BaseTableHead v-if="fullEdit">Effet id</BaseTableHead>
              <BaseTableHead v-if="fullEdit">Sprite Id</BaseTableHead>
              <BaseTableHead>Action</BaseTableHead>
            </template>
            <template #body>
              <BaseTableBody v-for="file in filesPage" :key="file.keyIndex" :is-updated="updateFileIds.includes(file.keyIndex || 0) || file.id <= -1" :is-deleted="deleteFileIds.includes(file.keyIndex || 0)">
                <BaseTableColunm>
                  <div class="w-full px-4 py-2 flex gap-2"><img :src="urlAssets + getFurnitureIconPath(file.itemName)" class="max-w-6 max-h-6" loading="lazy" /> {{ file.id }}</div>
                </BaseTableColunm>
                <BaseTableColunm v-if="fullEdit"><BaseInput v-model="file.type" text-to-edit @value-updated="addUpdateFileId(file)"></BaseInput></BaseTableColunm>
                <BaseTableColunm><BaseInput v-model="file.itemName" text-to-edit @value-updated="addUpdateFileId(file)"></BaseInput></BaseTableColunm>
                <BaseTableColunm><BaseInput v-model="file.width" text-to-edit number @value-updated="addUpdateFileId(file)"></BaseInput></BaseTableColunm>
                <BaseTableColunm><BaseInput v-model="file.length" text-to-edit number @value-updated="addUpdateFileId(file)"></BaseInput></BaseTableColunm>
                <BaseTableColunm><BaseInput v-model="file.stackHeight" text-to-edit number @value-updated="addUpdateFileId(file)"></BaseInput></BaseTableColunm>
                <BaseTableColunm v-if="fullEdit"><BaseInput v-model="file.canStack" text-to-edit boolean @value-updated="addUpdateFileId(file)"></BaseInput></BaseTableColunm>
                <BaseTableColunm v-if="fullEdit"><BaseInput v-model="file.canSit" text-to-edit boolean @value-updated="addUpdateFileId(file)"></BaseInput></BaseTableColunm>
                <BaseTableColunm v-if="fullEdit"><BaseInput v-model="file.isWalkable" text-to-edit boolean @value-updated="addUpdateFileId(file)"></BaseInput></BaseTableColunm>
                <BaseTableColunm><BaseInput v-model="file.interactionType" text-to-edit @value-updated="addUpdateFileId(file)"></BaseInput></BaseTableColunm>
                <BaseTableColunm><BaseInput v-model="file.interactionModesCount" text-to-edit number @value-updated="addUpdateFileId(file)"></BaseInput></BaseTableColunm>
                <BaseTableColunm v-if="fullEdit"><BaseInput v-model="file.vendingIds" text-to-edit @value-updated="addUpdateFileId(file)"></BaseInput></BaseTableColunm>
                <BaseTableColunm v-if="fullEdit"><BaseInput v-model="file.heightAdjustable" text-to-edit @value-updated="addUpdateFileId(file)"></BaseInput></BaseTableColunm>
                <BaseTableColunm v-if="fullEdit"><BaseInput v-model="file.effectId" text-to-edit number @value-updated="addUpdateFileId(file)"></BaseInput></BaseTableColunm>
                <BaseTableColunm v-if="fullEdit"><BaseInput v-model="file.spriteId" text-to-edit number @value-updated="addUpdateFileId(file)"></BaseInput></BaseTableColunm>
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
const { isLoading, getFiles, addEmptyFile, addDeleteFileId, saveAllfiles, addUpdateFileId, filesPage, pageCount, pageId, pageSearch, deleteFileIds, updateFileIds, fileNeedSaveCount, updatePageCurrent } = await useFetchData<ApiData>(
  '/api/catalog-item-base'
)

const { urlAssets } = useRuntimeConfig().public

const fullEdit = ref(false)

const defaultFile = {
  id: -1,
  type: 's',
  itemName: '',
  width: 1,
  length: 1,
  stackHeight: 1,
  canStack: 0,
  canSit: 0,
  isWalkable: 0,
  interactionType: 'default',
  interactionModesCount: 1,
  vendingIds: 0,
  heightAdjustable: '',
  effectId: 0,
  spriteId: 0
} satisfies ApiData

interface ApiData {
  keyIndex?: number
  id: number
  type: string
  itemName: string
  width: number
  length: number
  stackHeight: number
  canStack: number
  canSit: number
  isWalkable: number
  interactionType: string
  interactionModesCount: number
  vendingIds: number
  heightAdjustable: string
  effectId: number
  spriteId: number
}
</script>
