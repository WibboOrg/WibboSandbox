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
                <BaseButton @click="addEmptyFile({ id: -1, input: 'Input', minrank: 1, description_fr: 'Description' })">+ Ajouté</BaseButton>
            </div>
        </div>
        <div class="col-span-1">
            <BaseCard>
                <template #title>Modifier emulateur (Commande)</template>
                <template #body>
                    <BaseSpinner :loading="isLoading" v-if="isLoading" />
                    <BaseTable>
                        <template #head>
                            <BaseTableHead>#</BaseTableHead>
                            <BaseTableHead>Input</BaseTableHead>
                            <BaseTableHead>Min rank</BaseTableHead>
                            <BaseTableHead>Texte</BaseTableHead>
                            <BaseTableHead>Action</BaseTableHead>
                        </template>
                        <template #body>
                            <BaseTableBody v-for="file in filesPage" :key="file.id">
                                <BaseTableColunm>
                                    <div class="w-full px-4 py-2">{{ file.id }}</div>
                                </BaseTableColunm>
                                <BaseTableColunm>
                                    <BaseInput v-model="file.input" text-to-edit></BaseInput>
                                </BaseTableColunm>
                                <BaseTableColunm>
                                    <BaseInput v-model="file.minrank" text-to-edit number></BaseInput>
                                </BaseTableColunm>
                                <BaseTableColunm>
                                    <BaseInput v-model="file.description_fr" text-to-edit></BaseInput>
                                </BaseTableColunm>
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
const { isLoading, patchFile, deleteFile, createFile, getFiles, filesPage, pageCount, pageId, pageSearch, updatePageCurrent, addEmptyFile } = useFetchData<ApiData>('EmulatorCommand')

interface ApiData {
    id: number
    input: string
    minrank: number
    description_fr: string
}
</script>
