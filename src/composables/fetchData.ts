import { Ref } from 'vue'

export const useFetchData = <T extends object>(url: string, noReverse = false) => {
    const isLoading = ref(true)
    const pageCurrent = ref(0)
    const pageCountItem = ref(100)
    const pageSearch = ref('')
    const files = ref([]) as Ref<T[]>

    const getFiles = async () => {
        isLoading.value = true
        try {
            files.value = await useFetchAPI<T[]>(url)
            if (!noReverse) files.value = files.value.reverse()
        } catch (e) {
            console.error(e)
        }
        isLoading.value = false
    }

    const deleteFile = async (id: number | string) => {
        isLoading.value = true
        try {
            if (id !== -1) await useFetchAPI(url, 'DELETE', { body: JSON.stringify({ id }) })
            files.value = files.value.filter((x) => Object.values(x)[0] !== id)
            showMessage('Suppression effectuée', false)
        } catch (e) {
            console.error(e)
        }
        isLoading.value = false
    }

    const patchFile = async (file: T) => {
        isLoading.value = true
        try {
            await useFetchAPI(url, 'PATCH', { body: JSON.stringify(file) })
            showMessage('Mise à jour effectuée', false)
        } catch (e) {
            console.error(e)
        }
        isLoading.value = false
    }

    const putFile = async (file: T) => {
        isLoading.value = true
        try {
            await useFetchAPI(url, 'PUT', { body: JSON.stringify(file) })
            showMessage('Mise à jour effectuée', false)
        } catch (e) {
            console.error(e)
        }
        isLoading.value = false
    }

    const createFile = async (file: T) => {
        isLoading.value = true
        try {
            const newFile = await useFetchAPI<T>(url, 'POST', { body: JSON.stringify(file) })

            files.value = [newFile, ...files.value].filter((x) => Object.values(x)[0] !== Object.values(file)[0])
            showMessage('Création effectuée', false)
        } catch (e) {
            console.error(e)
        }
        isLoading.value = false
    }

    const importFile = async (file: { file: { base64: string; name: string } }) => {
        isLoading.value = true
        try {
            const newFile = await useFetchAPI<T>(url, 'POST', { body: JSON.stringify(file) })

            files.value = [newFile, ...files.value].filter((x) => Object.values(x)[0] !== Object.values(file)[0])
            showMessage('Création effectuée', false)
        } catch (e) {
            console.error(e)
        }
        isLoading.value = false
    }

    const addEmptyFile = (file: T) => {
        if (!files.value.find((x) => Object.values(x)[0] === Object.values(file)[0])) files.value = [file, ...files.value]
    }

    const updatePageCurrent = (pageId: number) => (pageCurrent.value = pageId)

    onMounted(async () => await getFiles())

    const filesSearch = computed(() => files.value.filter((x) => Object.values(x).some((k) => k.toString().toLowerCase().includes(pageSearch.value.toLowerCase()))))
    const pageCount = computed(() => (filesSearch.value.length > pageCountItem.value ? Math.floor(filesSearch.value.length / pageCountItem.value) + 1 : 1))
    const pageId = computed(() => (pageCurrent.value > pageCount.value ? pageCount.value : pageCurrent.value < 1 ? 1 : pageCurrent.value))

    const filesPage = computed(() => filesSearch.value.slice((pageId.value - 1) * pageCountItem.value, pageId.value * pageCountItem.value))

    return { isLoading, getFiles, deleteFile, patchFile, createFile, importFile, putFile, updatePageCurrent, addEmptyFile, pageCurrent, pageCountItem, files, pageSearch, pageId, pageCount, filesPage }
}
