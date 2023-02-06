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
                <BaseButton @click="fullEdit = !fullEdit">Afficher tout</BaseButton>
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
                            <BaseTableHead>Action</BaseTableHead>
                        </template>
                        <template #body>
                            <BaseTableBody v-for="file in filesPage" :key="file.id">
                                <BaseTableColunm>
                                    <div class="w-full px-4 py-2">{{ file.id }}</div>
                                </BaseTableColunm>
                                <BaseTableColunm><BaseInput v-model="file.item_name" text-to-edit></BaseInput></BaseTableColunm>
                                <BaseTableColunm><BaseInput v-model="file.width" text-to-edit></BaseInput></BaseTableColunm>
                                <BaseTableColunm><BaseInput v-model="file.length" text-to-edit></BaseInput></BaseTableColunm>
                                <BaseTableColunm><BaseInput v-model="file.stack_height" text-to-edit></BaseInput></BaseTableColunm>
                                <BaseTableColunm v-if="fullEdit"><BaseInput v-model="file.can_stack" text-to-edit check-box></BaseInput></BaseTableColunm>
                                <BaseTableColunm v-if="fullEdit"><BaseInput v-model="file.can_sit" text-to-edit check-box></BaseInput></BaseTableColunm>
                                <BaseTableColunm v-if="fullEdit"><BaseInput v-model="file.is_walkable" text-to-edit check-box></BaseInput></BaseTableColunm>
                                <BaseTableColunm><BaseInput v-model="file.interaction_type" text-to-edit></BaseInput></BaseTableColunm>
                                <BaseTableColunm><BaseInput v-model="file.interaction_modes_count" text-to-edit></BaseInput></BaseTableColunm>
                                <BaseTableColunm v-if="fullEdit"><BaseInput v-model="file.vending_ids" text-to-edit></BaseInput></BaseTableColunm>
                                <BaseTableColunm v-if="fullEdit"><BaseInput v-model="file.height_adjustable" text-to-edit></BaseInput></BaseTableColunm>
                                <BaseTableColunm v-if="fullEdit"><BaseInput v-model="file.effect_id" text-to-edit></BaseInput></BaseTableColunm>
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
const { isLoading, patchFile, deleteFile, createFile, getFiles, filesPage, pageCount, pageId, pageSearch, updatePageCurrent, addEmptyFile } = useFetchData<ApiData>('CatalogItemBase&id=' + id)

const fullEdit = ref(false)

const defaultFile = {
    id: -1,
    item_name: '',
    width: 1,
    length: 1,
    stack_height: 1,
    can_stack: 0,
    can_sit: 0,
    is_walkable: 0,
    interaction_type: 'default',
    interaction_modes_count: 1,
    vending_ids: 0,
    height_adjustable: '',
    effect_id: 0,
} satisfies ApiData

interface ApiData {
    id: number
    item_name: string
    width: number
    length: number
    stack_height: number
    can_stack: number
    can_sit: number
    is_walkable: number
    interaction_type: string
    interaction_modes_count: number
    vending_ids: number
    height_adjustable: string
    effect_id: number
}
</script>
