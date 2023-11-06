<template>
    <div class="grid grid-cols-1 gap-4">
        <div class="col-span-1">
            <label class="text-xl font-bold">Recherche</label>
            <BaseInput placeholder="Filter les resultats" v-model="pageSearch" :delay="500" />
        </div>
        <div class="col-span-1">
            <label class="text-xl font-bold">Choisir une option</label>
            <div class="flex flex-row gap-2 mt-2">
                <BaseButton @click="getFiles">Recharger la page</BaseButton>
                <BaseButton @click="addEmptyFile(defaultFile)">+ Ajouté</BaseButton>
            </div>
        </div>
        <div class="col-span-1">
            <BaseCard>
                <template #title>Modifier catalogue (Object)</template>
                <template #body>
                    <BaseSpinner :loading="isLoading" v-if="isLoading" />
                    <BaseTable>
                        <template #head>
                            <BaseTableHead>#</BaseTableHead>
                            <BaseTableHead>Item Id</BaseTableHead>
                            <BaseTableHead>Page Id</BaseTableHead>
                            <BaseTableHead>Nom</BaseTableHead>
                            <BaseTableHead>Credits</BaseTableHead>
                            <BaseTableHead>Points</BaseTableHead>
                            <BaseTableHead>LimitCoins</BaseTableHead>
                            <BaseTableHead>Nombre</BaseTableHead>
                            <BaseTableHead>Activer</BaseTableHead>
                            <BaseTableHead>Badge Code</BaseTableHead>
                            <BaseTableHead>Action</BaseTableHead>
                        </template>
                        <template #body>
                            <BaseTableBody v-for="file in filesPage" :key="file.id">
                                <BaseTableColunm>
                                    <div class="w-full px-4 py-2">{{ file.id }}</div>
                                </BaseTableColunm>
                                <BaseTableColunm><BaseInput v-model="file.itemId" text-to-edit></BaseInput></BaseTableColunm>
                                <BaseTableColunm><BaseInput v-model="file.pageId" text-to-edit></BaseInput></BaseTableColunm>
                                <BaseTableColunm><BaseInput v-model="file.catalogName" text-to-edit></BaseInput></BaseTableColunm>
                                <BaseTableColunm><BaseInput v-model="file.costCredits" text-to-edit number></BaseInput></BaseTableColunm>
                                <BaseTableColunm><BaseInput v-model="file.costDiamonds" text-to-edit number></BaseInput></BaseTableColunm>
                                <BaseTableColunm><BaseInput v-model="file.costLimitcoins" text-to-edit number></BaseInput></BaseTableColunm>
                                <BaseTableColunm><BaseInput v-model="file.amount" text-to-edit number></BaseInput></BaseTableColunm>
                                <BaseTableColunm><BaseInput v-model="file.offerActive" text-to-edit boolean></BaseInput></BaseTableColunm>
                                <BaseTableColunm><BaseInput v-model="file.badge" text-to-edit></BaseInput></BaseTableColunm>
                                <BaseTableColunm>
                                    <div class="flex items-center justify-around w-full px-4 py-2">
                                        <IconSave @click="file.id === -1 ? createFile(file) : updateFile(file)" class="w-6 h-6 cursor-pointer hover:text-white" />
                                        <IconClose @click="deleteFile(file.id)" class="w-6 h-6 cursor-pointer hover:text-white" />
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
const { isLoading, updateFile, deleteFile, createFile, getFiles, filesPage, pageCount, pageId, pageSearch, updatePageCurrent, addEmptyFile } = await useFetchData<ApiData>('/api/catalog-item')

const defaultFile = { id: -1, itemId: 0, pageId: 0, catalogName: '', costCredits: 3, costDiamonds: 0, costLimitcoins: 0, amount: 1, offerActive: 1, badge: '' } satisfies ApiData

interface ApiData {
    id: number
    itemId: number
    pageId: number
    catalogName: string
    costCredits: number
    costDiamonds: number
    costLimitcoins: number
    amount: number
    offerActive: number
    badge: string
}
</script>
