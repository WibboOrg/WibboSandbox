<template>
    <div class="grid grid-cols-1 gap-4">
        <div class="col-span-1">
            <label class="text-xl font-bold">Recherche</label>
            <BaseInput placeholder="Filter les resultats" v-model.trim="pageSearch" :delay="500" />
        </div>
        <div class="col-span-1">
            <BaseCard>
                <template #title>Modifier external texte</template>
                <template #body>
                    <BaseSpinner :loading="isLoading" v-if="isLoading" />
                    <div v-if="filesPage.length">
                        <BaseButton @click="addEmptyFile({ id: -1, identifiant: '', value_fr: '' })" class="block w-auto float-right pb-2 pr-2">+ Ajouté</BaseButton>
                        <div class="table-responsive-sm">
                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">#</th>
                                        <th scope="col" class="px-6 py-3">Texte</th>
                                        <th scope="col" class="px-6 py-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="file in filesPage" :key="file.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td class="align-middle">
                                            <div class="w-full px-4 py-2" v-if="file.id !== -1">{{ file.identifiant }} ({{ file.id }})</div>
                                            <BaseInput v-model="file.identifiant" :value="file.identifiant" placeholder="Mettre un identifiant" text-to-edit v-else></BaseInput>
                                        </td>
                                        <td class="align-middle">
                                            <BaseInput v-model="file.value_fr" :value="file.value_fr" placeholder="Mettre une valeur" text-to-edit></BaseInput>
                                        </td>
                                        <td class="align-middle" v-if="file.id !== -1">
                                            <BaseButton @click="patchFile(file)">Sauvegarder</BaseButton>
                                            <BaseButton @click="deleteFile(file.id)">Supprimer</BaseButton>
                                        </td>
                                        <td class="align-middle" v-else>
                                            <BaseButton @click="createFile(file)">Enregistrer</BaseButton>
                                        </td>
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
const { isLoading, patchFile, deleteFile, createFile, addEmptyFile, filesPage, pageCount, pageId, pageSearch, updatePageCurrent } = useFetchData<ApiData>('emulatorText')

interface ApiData {
    id: number
    identifiant: string
    value_fr: string
}
</script>
