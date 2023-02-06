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
            </div>
        </div>
        <div class="col-span-1">
            <BaseCard>
                <template #title>Log sandbox</template>
                <template #body>
                    <BaseSpinner :loading="isLoading" v-if="isLoading" />
                    <BaseTable>
                        <template #head>
                            <BaseTableHead>#</BaseTableHead>
                            <BaseTableHead>Pseudo</BaseTableHead>
                            <BaseTableHead>Methode</BaseTableHead>
                            <BaseTableHead>Action nom</BaseTableHead>
                            <BaseTableHead>Action Id</BaseTableHead>
                            <BaseTableHead>Date</BaseTableHead>
                        </template>
                        <template #body>
                            <BaseTableBody v-for="file in filesPage" :key="file.id">
                                <BaseTableColunm>
                                    <div class="w-full px-4 py-2">{{ file.id }}</div>
                                </BaseTableColunm>
                                <BaseTableColunm>
                                    <div class="w-full px-4 py-2">{{ file.user_name }}</div>
                                </BaseTableColunm>
                                <BaseTableColunm>
                                    <div class="w-full px-4 py-2">{{ methodToText(file.method) }}</div>
                                </BaseTableColunm>
                                <BaseTableColunm>
                                    <div class="w-full px-4 py-2">{{ file.edit_name }}</div>
                                </BaseTableColunm>
                                <BaseTableColunm>
                                    <div class="w-full px-4 py-2">{{ file.edit_key }}</div>
                                </BaseTableColunm>
                                <BaseTableColunm>
                                    <div class="w-full px-4 py-2">{{ timestampToDate(file.timestamp_created) }}</div>
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
const { isLoading, filesPage, pageCount, pageId, pageSearch, updatePageCurrent, getFiles } = useFetchData<ApiData>('LogSandbox')

const methodToText = (method: string) => {
    switch (method) {
        case 'patch':
            return 'Modifier'
        case 'post':
            return 'Crée'
        case 'delete':
            return 'Supprimée'
    }

    return 'Aucun'
}

const timestampToDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000)
    const day = ('0' + date.getDate()).slice(-2)
    const mounth = ('0' + date.getMonth() + 1).slice(-2)
    const year = ('0' + date.getFullYear()).slice(-2)
    const hours = ('0' + date.getHours()).slice(-2)
    const minutes = ('0' + date.getMinutes()).slice(-2)
    const seconds = ('0' + date.getSeconds()).slice(-2)

    return `${day}/${mounth}/${year} à ${hours}:${minutes}:${seconds}`
}

interface ApiData {
    id: number
    user_name: number
    method: string
    edit_name: string
    edit_key: string
    timestamp_created: number
}
</script>
