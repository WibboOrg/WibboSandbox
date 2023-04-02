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
                <BaseButton @click="addEmptyFile(defaultValue)">+ Ajouté</BaseButton>
                <BaseButton @click="fullEdit = !fullEdit">Afficher tout</BaseButton>
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
                            <BaseTableBody v-for="file in filesPage" :key="file.id">
                                <BaseTableColunm>
                                    <div class="w-full px-4 py-2">
                                        {{ file.id }}
                                        <div @click="navigateTo({ path: 'catalog-item', query: { page_id: file.id } })" class="cursor-pointer whitespace-nowrap hover:underline hover:text-white">
                                            Editer object
                                        </div>
                                        <div
                                            @click="navigateTo({ path: 'catalog-item-base', query: { page_id: file.id } })"
                                            class="cursor-pointer whitespace-nowrap hover:underline hover:text-white"
                                        >
                                            Editer config
                                        </div>
                                    </div>
                                </BaseTableColunm>
                                <BaseTableColunm><BaseInput v-model="file.parent_id" text-to-edit number></BaseInput></BaseTableColunm>
                                <BaseTableColunm><BaseInput v-model="file.caption" text-to-edit></BaseInput></BaseTableColunm>
                                <BaseTableColunm><BaseInput v-model="file.icon_image" text-to-edit number></BaseInput></BaseTableColunm>
                                <BaseTableColunm v-if="fullEdit"><BaseInput v-model="file.enabled" text-to-edit boolean></BaseInput></BaseTableColunm>
                                <BaseTableColunm><BaseInput v-model="file.required_right" text-to-edit></BaseInput></BaseTableColunm>
                                <BaseTableColunm><BaseInput v-model="file.order_num" text-to-edit number></BaseInput></BaseTableColunm>
                                <BaseTableColunm><BaseInput v-model="file.page_layout" text-to-edit></BaseInput></BaseTableColunm>
                                <BaseTableColunm v-if="fullEdit"><BaseInput v-model="file.page_strings_1" text-to-edit></BaseInput></BaseTableColunm>
                                <BaseTableColunm v-if="fullEdit"><BaseInput v-model="file.page_strings_2" text-to-edit></BaseInput></BaseTableColunm>
                                <BaseTableColunm><BaseInput v-model="file.is_premium" text-to-edit boolean></BaseInput></BaseTableColunm>
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
const { isLoading, updateFile, deleteFile, createFile, getFiles, filesPage, pageCount, pageId, pageSearch, updatePageCurrent, addEmptyFile } = await useFetchData<ApiData>('/api/catalog-page')

const fullEdit = ref(false)

const defaultValue: ApiData = {
    id: -1,
    parent_id: -1,
    caption: '',
    icon_image: 1,
    enabled: true,
    required_right: '',
    order_num: 1,
    page_layout: 'default_3x3',
    page_strings_1: 'wibbo|catalog_base',
    page_strings_2: '',
    is_premium: false,
}

interface ApiData {
    id: number
    parent_id: number
    caption: string
    icon_image: number
    enabled: boolean
    required_right: string
    order_num: number
    page_layout: string
    page_strings_1: string
    page_strings_2: string
    is_premium: boolean
}
</script>
