import { Ref } from 'vue'

export const useFetchData = <T>(url: string) => {
    const isLoading = ref(true)
    const pageCurrent = ref(0)
    const pageCountItem = ref(100)
    const pageSearch = ref('')
    const files = ref([]) as Ref<T[]>

    const getFiles = async () => {
        isLoading.value = true
        try {
            files.value = await useFetchAPI<T[]>(url)
        } catch (e) {
            console.error(e)
        }
        isLoading.value = false
    }

    const deleteFile = async (id: number) => {
        isLoading.value = true
        try {
            await useFetchAPI(url, 'DELETE', { body: JSON.stringify({ id }) })
        } catch (e) {
            console.error(e)
        }
        isLoading.value = false
    }

    const patchFile = async (file: T) => {
        isLoading.value = true
        try {
            await useFetchAPI(url, 'PATCH', { body: JSON.stringify(file) })
        } catch (e) {
            console.error(e)
        }
        isLoading.value = false
    }

    const putFile = async (file: T) => {
        isLoading.value = true
        try {
            await useFetchAPI(url, 'PUT', { body: JSON.stringify(file) })
        } catch (e) {
            console.error(e)
        }
        isLoading.value = false
    }

    const createFile = async (file: T) => {
        isLoading.value = true
        try {
            await useFetchAPI(url, 'POST', { body: JSON.stringify(file) })
        } catch (e) {
            console.error(e)
        }
        isLoading.value = false
    }

    const filesSearch = computed(() =>
        files.value.filter((x) =>
            typeof x == 'object'
                ? Object.values(x as Record<string, string>).some((k) => k.toString().toLowerCase().includes(pageSearch.value.toLowerCase()))
                : (x as string).toString().toLowerCase().includes(pageSearch.value.toLowerCase()),
        ),
    )
    const pageCount = computed(() => (filesSearch.value.length > pageCountItem.value ? Math.floor(filesSearch.value.length / pageCountItem.value) : 1))
    const pageId = computed(() => (pageCurrent.value > pageCount.value ? pageCount.value : pageCurrent.value < 1 ? 1 : pageCurrent.value))

    const filesPage = computed(() => filesSearch.value.slice((pageId.value - 1) * pageCountItem.value, pageId.value * pageCountItem.value))

    return { isLoading, getFiles, deleteFile, patchFile, createFile, putFile, pageCurrent, pageCountItem, files, pageSearch, pageId, pageCount, filesPage }
}
