<template>
    <div class="grid grid-cols-1 gap-4">
        <div class="col-span-1">
            <label class="text-xl font-bold">Recherche</label>
            <BaseInput placeholder="Filter les resultats" v-model.trim="pageSearch" :delay="500" />
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
                                <BaseTableColunm>
                                    <BaseInput v-model="file.page_id" text-to-edit></BaseInput>
                                </BaseTableColunm>
                                <BaseTableColunm><BaseInput v-model="file.catalog_name" text-to-edit></BaseInput></BaseTableColunm>
                                <BaseTableColunm><BaseInput v-model="file.cost_credits" text-to-edit number></BaseInput></BaseTableColunm>
                                <BaseTableColunm><BaseInput v-model="file.cost_diamonds" text-to-edit number></BaseInput></BaseTableColunm>
                                <BaseTableColunm><BaseInput v-model="file.cost_limitcoins" text-to-edit number></BaseInput></BaseTableColunm>
                                <BaseTableColunm><BaseInput v-model="file.amount" text-to-edit number></BaseInput></BaseTableColunm>
                                <BaseTableColunm><BaseInput v-model="file.offer_active" text-to-edit boolean></BaseInput></BaseTableColunm>
                                <BaseTableColunm><BaseInput v-model="file.badge" text-to-edit></BaseInput></BaseTableColunm>
                                <BaseTableColunm>
                                    <div class="flex justify-around items-center w-full px-4 py-2">
                                        <IconSave @click="file.id === -1 ? createFile(file) : patchFile(file)" class="h-6 w-6 cursor-pointer hover:text-white" />
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
const route = useRoute()

const id = route.query.id ?? null
const { isLoading, patchFile, deleteFile, createFile, getFiles, filesPage, pageCount, pageId, pageSearch, updatePageCurrent, addEmptyFile } = useFetchData<ApiData>('CatalogItem&id=' + id)

const defaultFile = { id: -1, page_id: 0, catalog_name: '', cost_credits: 3, cost_diamonds: 0, cost_limitcoins: 0, amount: 1, offer_active: 1, badge: '' } satisfies ApiData

interface ApiData {
    id: number
    page_id: number
    catalog_name: string
    cost_credits: number
    cost_diamonds: number
    cost_limitcoins: number
    amount: number
    offer_active: number
    badge: string
}
</script>
