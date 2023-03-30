<template>
    <div class="grid grid-cols-1 gap-4">
        <div class="col-span-1">
            <BaseCard>
                <template #title>Outils pour regénérer des fichiers</template>
                <template #body>
                    <div class="grid grid-cols-1 gap-3">
                        <div class="col-span-full">
                            <label class="block mb-1">Permets de régénérer le furnitureData.json</label>
                            <BaseButton primary :loading="loading" @click="reloadFurnidata">Regénérer le furnitureData</BaseButton>
                        </div>
                    </div>
                </template>
            </BaseCard>
        </div>
    </div>
</template>

<script lang="ts" setup>
const { showMessage } = useNotification()

const loading = ref(false)

const reloadFurnidata = async () => {
    if (loading.value) return

    try {
        loading.value = true

        await useCsrfFetch('FurnitureData', { method: 'PATCH' })

        showMessage({ message: 'Le furnitureData.json a été regénérer', success: true })
    } catch (e) {
        console.error(e)
    }

    loading.value = false
}
</script>
