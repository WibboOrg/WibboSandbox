<template>
    <div class="grid grid-cols-1 gap-4">
        <div class="col-span-1">
            <label class="text-xl font-bold">Recherche</label>
            <BaseInput placeholder="Filter les resultats" v-model.trim="pageSearch" :delay="500" />
        </div>
        <div class="col-span-1">
            <BaseCard>
                <template #title>Modifier mobilier texte</template>
                <template #body>
                    <BaseSpinner :loading="isLoading" v-if="isLoading" />
                    <BaseTable>
                        <template #head>
                            <BaseTableHead>#</BaseTableHead>
                            <BaseTableHead>Nom</BaseTableHead>
                            <BaseTableHead>Texte</BaseTableHead>
                            <BaseTableHead>Action</BaseTableHead>
                        </template>
                        <template #body>
                            <BaseTableBody v-for="file in filesPage" :key="file.id">
                                <BaseTableColunm>
                                    <div class="w-full px-4 py-2">{{ file.classname }} ({{ file.id }})</div>
                                </BaseTableColunm>
                                <BaseTableColunm><BaseInput v-model="file.name" text-to-edit></BaseInput></BaseTableColunm>
                                <BaseTableColunm>
                                    <BaseInput v-model="file.description" text-to-edit></BaseInput>
                                </BaseTableColunm>
                                <BaseTableColunm>
                                    <div class="flex justify-around items-center w-full px-4 py-2">
                                        <IconSave @click="patchFile(file)" class="h-6 w-6 cursor-pointer hover:text-white" />
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
const { isLoading, patchFile, filesPage, pageCount, pageId, pageSearch, updatePageCurrent } = useFetchData<IFurnitureType>('TextFurni')

interface IFurnitureType {
    id?: number
    classname?: string
    revision?: number
    category?: string
    defaultdir?: number
    xdim?: number
    ydim?: number
    partcolors?: { color: string[] }
    name?: string
    description?: string
    adurl?: string
    offerid?: number
    buyout?: boolean
    rentofferid?: number
    rentbuyout?: boolean
    bc?: boolean
    excludeddynamic?: boolean
    customparams?: string
    specialtype?: number
    canstandon?: boolean
    cansiton?: boolean
    canlayon?: boolean
    furniline?: string
    environment?: string
    rare?: boolean
}
</script>
