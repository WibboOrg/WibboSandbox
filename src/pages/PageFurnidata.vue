<template>
    <div class="grid grid-cols-1 gap-4 h-full items-center">
        <div class="col-span-1">
            <BaseCard>
                <template #title>Importer des mobiliers</template>
                <template #body>
                    <div v-if="isLoading">Chargement... <BaseSpinner /></div>
                    <div class="table-responsive-md" v-else>
                        <table class="w-full text-center table-auto">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nom</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(file, index) in filesPage" :key="index">
                                    <td class="align-middle">{{ file.id }}</td>
                                    <td class="align-middle"><BaseInput v-model="file.name" :value="file.name"></BaseInput></td>
                                    <td class="align-middle"><BaseInput v-model="file.description" :value="file.description"></BaseInput></td>
                                    <td class="align-middle"><BaseButton>Sauvegarder</BaseButton></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </template>
            </BaseCard>
        </div>
    </div>
</template>

<script lang="ts" setup>
const { isLoading, loadFiles, filesPage } = useFetchData<IFurnitureType>('https://assets.wibbo.org/gamedata/FurnitureData.json')
loadFiles()

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
