import type { NitroFetchRequest } from 'nitropack'

interface FetchData extends Object {
  id: number | string | null
  keyIndex?: number
}

export const useFetchData = async <T extends FetchData, ReqT extends NitroFetchRequest = NitroFetchRequest>(request: Ref<ReqT> | ReqT | (() => ReqT), notReverse = false) => {
  const url = request.toString()
  let lastKeyIndex = -1

  const isLoading = ref(false)
  const files = ref<T[]>([]) as Ref<T[]>
  const updateIndexKeys = ref<number[]>([])
  const deleteIndexKeys = ref<number[]>([])

  const { showMessage } = useNotification()
  const { filesPage, pageCount, pageId, pageSearch, updatePageCurrent } = useFilesRoute<T>(files)

  const goToTop = () => (import.meta.server ? null : document.getElementById('main')?.scrollTo({ top: 0, behavior: 'smooth' }))

  const getFiles = async () => {
    isLoading.value = true

    try {
      files.value = []
      updateIndexKeys.value = []
      deleteIndexKeys.value = []

      const allFiles = await $fetch<T[]>(url)

      files.value = notReverse ? allFiles ?? [] : allFiles?.reverse()

      files.value.map((x, i) => (x.keyIndex = i))
      lastKeyIndex = files.value.length + 1
    } catch (e: unknown) {
      console.error(e)
    }

    goToTop()

    isLoading.value = false
  }

  const deleteFiles = async () => {
    isLoading.value = true

    try {
      updateIndexKeys.value = updateIndexKeys.value.filter((x) => !deleteIndexKeys.value.includes(x))
      const deleteFilesCount = deleteIndexKeys.value?.length
      const deleteFiles = files.value?.filter((x) => deleteIndexKeys.value.includes(x.keyIndex || 0))

      await $fetch(url, { body: deleteFiles, method: 'delete' })

      files.value = files.value?.filter((x) => !deleteIndexKeys.value.includes(x.keyIndex || 0))
      deleteIndexKeys.value = []

      showMessage({ message: 'Suppression effectuée (' + deleteFilesCount + ')', success: true })
    } catch (e: unknown) {
      console.error(e)
    }

    isLoading.value = false
  }

  const addUpdateFileId = (file: T) => {
    if (!updateIndexKeys.value.includes(file.keyIndex || 0) && file.id !== null && file.id != undefined) {
      updateIndexKeys.value = [...updateIndexKeys.value, file.keyIndex || 0]
    }
  }

  const addDeleteFileId = (file: T) => {
    if (file.id === null || file.id === undefined) {
      deleteIndexKeys.value = deleteIndexKeys.value.filter((x) => x !== file.keyIndex || 0)
      files.value = files.value?.filter((x) => x.keyIndex !== file.keyIndex || 0)
    } else if (!deleteIndexKeys.value.includes(file.keyIndex || 0)) {
      deleteIndexKeys.value = [...deleteIndexKeys.value, file.keyIndex || 0]
    } else {
      deleteIndexKeys.value = deleteIndexKeys.value.filter((x) => x !== file.keyIndex || 0)
    }
  }

  const updateAllFile = async () => {
    isLoading.value = true

    try {
      const updateFiles = files.value?.filter((x) => updateIndexKeys.value.includes(x.keyIndex || 0))
      const updateFilesCount = updateFiles?.length || 0

      await $fetch(url, { body: updateFiles, method: 'put' })

      updateIndexKeys.value = []

      showMessage({ message: 'Mise à jour effectuée (' + updateFilesCount + ')', success: true })
    } catch (e: unknown) {
      console.error(e)
    }

    isLoading.value = false
  }

  const createAllFile = async () => {
    isLoading.value = true

    try {
      const createFiles = files.value?.filter((x) => x.id === null || x.id === undefined)
      const createFileCount = createFiles?.length || 0

      const newFiles = await $fetch<T[]>(url, { body: createFiles, method: 'post' })
      newFiles.map((x, i) => (x.keyIndex = ++lastKeyIndex))

      files.value = [...newFiles, ...(files.value || [])].filter((x) => x.id !== null && x.id !== undefined)

      showMessage({ message: 'Création effectuée (' + createFileCount + ')', success: true })
    } catch (e: unknown) {
      console.error(e)
    }

    isLoading.value = false
  }

  const uploadFiles = async (uploadFiles: { base64: string; name: string }[]) => {
    isLoading.value = true

    try {
      const createFileCount = uploadFiles?.length || 0

      const newFiles = await $fetch<T[]>(url, { body: uploadFiles, method: 'post' })
      newFiles.map((x) => (x.keyIndex = ++lastKeyIndex))

      files.value = [...newFiles, ...(files.value || [])].filter((x) => x.id !== null && x.id !== undefined)

      showMessage({ message: 'Création effectuée (' + createFileCount + ')', success: true })
    } catch (e: unknown) {
      console.error(e)
    }

    isLoading.value = false
  }

  const saveAllfiles = async () => {
    if (fileDeleteCount.value > 0) {
      await deleteFiles()
    }

    if (fileCreateCount.value > 0) {
      await createAllFile()
    }

    if (fileUpdateCount.value > 0) {
      await updateAllFile()
    }
  }

  const addEmptyFile = (file: T) => {
    file.id = null
    file.keyIndex = ++lastKeyIndex
    files.value = [{ ...file }, ...(files.value || [])]

    goToTop()
  }

  // onServerPrefetch(async () => await getFiles(false))
  onMounted(async () => await getFiles())

  const fileDeleteCount = computed(() => deleteIndexKeys.value.length)
  const fileUpdateCount = computed(() => updateIndexKeys.value.length)
  const fileCreateCount = computed(() => files.value?.filter((x) => x.id === null || x.id === undefined).length || 0)

  const fileNeedSaveCount = computed(() => fileCreateCount.value + fileUpdateCount.value + fileDeleteCount.value)

  return {
    isLoading,
    getFiles,
    saveAllfiles,
    addEmptyFile,
    addUpdateFileId,
    addDeleteFileId,
    uploadFiles,
    updatePageCurrent,
    pageCount,
    pageId,
    pageSearch,
    filesPage,
    fileNeedSaveCount,
    deleteFileIds: deleteIndexKeys,
    updateFileIds: updateIndexKeys
  }
}

export const useFilesRoute = <T extends FetchData>(files: Ref<T[]>) => {
  const pageCurrent = ref(0)
  const pageCountItem = ref(100)
  const pageSearch = ref('')
  const categoryFilter = ref({ key: '', content: '' })

  const route = useRoute()

  const updatePageCurrent = (pageId: number) => (pageCurrent.value = pageId)

  const updateCategoryFitler = () => (categoryFilter.value = Object.keys(route.query)[0] == null ? { key: '', content: '' } : { key: Object.keys(route.query)[0], content: Object.values(route.query)[0]?.toString() || '' })

  watch(
    () => route.query,
    () => updateCategoryFitler(),
    { immediate: true }
  )

  const filesByCategory = computed(() =>
    categoryFilter.value.key === '' ? files.value : files.value.filter((x) => Object.entries(x).some(([key, value]) => key?.toString() == categoryFilter.value.key && value?.toString().includes(categoryFilter.value.content)))
  )
  const filesSearch = computed(() => filesByCategory.value?.filter((x) => Object.values(x).some((k) => k != null && k.toString().toLowerCase().includes(pageSearch.value.toLowerCase()))) ?? [])
  const pageCount = computed(() => (filesSearch.value.length > pageCountItem.value ? Math.floor(filesSearch.value.length / pageCountItem.value) + 1 : 1))
  const pageId = computed(() => (pageCurrent.value > pageCount.value ? pageCount.value : pageCurrent.value < 1 ? 1 : pageCurrent.value))

  const filesPage = computed(() => filesSearch.value?.slice((pageId.value - 1) * pageCountItem.value, pageId.value * pageCountItem.value))

  return {
    filesPage,
    pageId,
    pageCount,
    pageSearch,
    updatePageCurrent
  }
}
