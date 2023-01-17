<template>
    <div class="grid grid-cols-1 gap-4">
        <div class="col-span-1">
            <label class="text-xl font-bold">Recherche</label>
            <BaseInput placeholder="Filter les resultats" v-model.trim="pageSearch" :delay="500" />
        </div>
        <div class="col-span-1">
            <BaseCard>
                <template #title>Importer des mobiliers</template>
                <template #body>
                    <BaseSpinner :loading="isLoading" v-if="isLoading" />
                    <div v-if="filesPage.length">
                        <div class="table-responsive-sm">
                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">#</th>
                                        <th scope="col" class="px-6 py-3">Nom</th>
                                        <th scope="col" class="px-6 py-3">Description</th>
                                        <th scope="col" class="px-6 py-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="file in filesPage" :key="file.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td class="align-middle">
                                            <div class="w-full px-4 py-2">{{ file.classname }} ({{ file.id }})</div>
                                        </td>
                                        <td class="align-middle"><BaseInput v-model="file.name" :value="file.name" :text-to-edit="true"></BaseInput></td>
                                        <td class="align-middle">
                                            <BaseInput v-model="file.description" :value="file.description" :text-to-edit="true"></BaseInput>
                                        </td>
                                        <td class="align-middle"><BaseButton @click="patchFile(file)">Sauvegarder</BaseButton></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <BasePagination :page-id="pageId" :page-count="pageCount" @pageCurrent="updatePageCurrent" class="float-right" />
                    </div>
                </template>
            </BaseCard>
        </div>
    </div>
</template>

<script lang="ts" setup>
const { isLoading, getFiles, patchFile, filesPage, pageCurrent, pageCount, pageId, pageSearch } = useFetchData<IFurnitureType>('furnidata')
getFiles()

const updatePageCurrent = (pageId: number) => (pageCurrent.value = pageId)

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
