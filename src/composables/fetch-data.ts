import type { NitroFetchRequest } from 'nitropack';

export const useFetchData = async <T extends Object, ReqT extends NitroFetchRequest = NitroFetchRequest>(request: Ref<ReqT> | ReqT | (() => ReqT), reverse = false) => {
    const url = request.toString()

    const isLoading = ref(false)
    const files = ref<T[]>([]) as Ref<T[]>
    const pageCurrent = ref(0)
    const pageCountItem = ref(100)
    const pageSearch = ref('')
    const categoryFilter = ref({ key: '', content: '' })
    
    const route = useRoute()
    const { showMessage } = useNotification()
  
    const getFiles = async () => {
        const fileList = await $fetch(url) as T[]

        files.value = reverse ? fileList.reverse() : fileList
    }

    const deleteFile = async (id: number | string) => {
        isLoading.value = true

        if (id !== -1 && id !== '') useCsrfFetch(url, { body: { id }, method: 'delete' })
        files.value = files.value.filter((x) => Object.values(x)[0] !== id)
        showMessage({ message: 'Suppression effectuée', success: true })

        isLoading.value = false
    }

    const updateFile = async (file: T) => {
        isLoading.value = true

        const { error } = useCsrfFetch(url, { body: file, method: 'put' })
        if (!error.value) showMessage({ message: 'Mise à jour effectuée', success: true })
        
        isLoading.value = false
    }

    const createFile = async (file: T | UploadData) => {
        isLoading.value = true

        const { data, error } = useCsrfFetch(url, { body: file, method: 'post' })

        watch(data, newFile => {
            if (!error.value) {
                files.value = [newFile as T, ...files.value].filter((x) => Object.values(x)[0] !== Object.values(file)[0])
                showMessage({ message: 'Création effectuée', success: true })
            }
        })

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

    onMounted(() => getFiles())

    watch(() => route.query, updateCategoryFitler, { immediate: true })

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
        updateFile,
        createFile,
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

type UploadData = {
    file: {
        base64: string;
        name: string;
    }
}