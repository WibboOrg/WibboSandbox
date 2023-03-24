import { Ref } from 'vue'

export const useFetchData = <T extends object>(url: string, noReverse = false) => {
    const isLoading = ref(true)
    const pageCurrent = ref(0)
    const pageCountItem = ref(100)
    const pageSearch = ref('')
    const files = ref([]) as Ref<T[]>
    const categoryFilter = ref<{ key: string; content: string }>({ key: '', content: '' })
    
    const route = useRoute()
    const { showMessage } = useNotification()

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
            if (id !== -1 && id !== '') await useFetchAPI(url, { body: { id }, method: 'DELETE' })
            files.value = files.value.filter((x) => Object.values(x)[0] !== id)
            showMessage({ message: 'Suppression effectuée', success: true })
        } catch (e) {
            console.error(e)
        }
        isLoading.value = false
    }

    const patchFile = async (file: T) => {
        isLoading.value = true
        try {
            await useFetchAPI(url, { body: file, method: 'PATCH' })
            showMessage({ message: 'Mise à jour effectuée', success: true })
        } catch (e) {
            console.error(e)
        }
        isLoading.value = false
    }

    const putFile = async (file: T) => {
        isLoading.value = true
        try {
            await useFetchAPI(url, { body: file, method: 'PUT' })
            showMessage({ message: 'Mise à jour effectuée', success: true })
        } catch (e) {
            console.error(e)
        }
        isLoading.value = false
    }

    const createFile = async (file: T) => {
        isLoading.value = true
        try {
            const newFile = await useFetchAPI<T>(url, { body: file, method: 'POST' })

            files.value = [newFile, ...files.value].filter((x) => Object.values(x)[0] !== Object.values(file)[0])
            showMessage({ message: 'Création effectuée', success: true })
        } catch (e) {
            console.error(e)
        }
        isLoading.value = false
    }

    const importFile = async (file: { file: { base64: string; name: string } }) => {
        isLoading.value = true
        try {
            const newFile = await useFetchAPI<T>(url, { body: file, method: 'POST' })

            files.value = [newFile, ...files.value].filter((x) => Object.values(x)[0] !== Object.values(file)[0])
            showMessage({ message: 'Création effectuée', success: true })
        } catch (e) {
            console.error(e)
        }
        isLoading.value = false
    }

    const addEmptyFile = (file: T) => {
        const findFile = files.value.find((x) => Object.values(x)[0] === Object.values(file)[0])
        if (!findFile) {
            files.value = [file, ...files.value]
        } else {
            showMessage({ message: 'Le fichier existe déjà' })
        }
    }

    const updatePageCurrent = (pageId: number) => (pageCurrent.value = pageId)

    const updateCategoryFitler = () =>
        (categoryFilter.value = Object.keys(route.query)[0] == null ? { key: '', content: '' } : { key: Object.keys(route.query)[0], content: Object.values(route.query)[0]?.toString() || '' })

    watch(() => route.query, updateCategoryFitler, { immediate: true })

    onMounted(async () => await getFiles())

    const filesByCategory = computed(() => {
        return categoryFilter.value.key === ''
            ? files.value
            : files.value.filter((x) => Object.entries(x).some((k) => k[0]?.toString() === categoryFilter.value.key && k[1]?.toString() === categoryFilter.value.content))
    })
    const filesSearch = computed(() => filesByCategory.value.filter((x) => Object.values(x).some((k) => k != null && k.toString().toLowerCase().includes(pageSearch.value.toLowerCase()))))
    const pageCount = computed(() => (filesSearch.value.length > pageCountItem.value ? Math.floor(filesSearch.value.length / pageCountItem.value) + 1 : 1))
    const pageId = computed(() => (pageCurrent.value > pageCount.value ? pageCount.value : pageCurrent.value < 1 ? 1 : pageCurrent.value))

    const filesPage = computed(() => filesSearch.value.slice((pageId.value - 1) * pageCountItem.value, pageId.value * pageCountItem.value))

    return {
        isLoading,
        getFiles,
        deleteFile,
        patchFile,
        createFile,
        importFile,
        putFile,
        updatePageCurrent,
        addEmptyFile,
        pageCurrent,
        pageCountItem,
        files,
        pageSearch,
        pageId,
        pageCount,
        filesPage,
        categoryFilter,
    }
}
