export const useFetchData = <T>(url: string) => {
    const isLoading = ref(true)
    const pageCurrent = ref(0)
    const pageCountItem = ref(100)
    const files = ref<T[]>([])

    const loadFiles = async () => {
        const furniData = await (await fetch(url)).json()
        files.value = Object.values({ ...furniData?.roomitemtypes?.furnitype, ...furniData?.wallitemtypes?.furnitype })

        isLoading.value = false
    }

    const goTo = (pageId: number) => {
        if (pageId == pageId) return

        if (pageId > pageCount.value) pageCurrent.value = pageCount.value
        else if (pageId <= 1) pageCurrent.value = 1
        else pageCurrent.value = pageId

        document.getElementById('app')?.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const pageId = computed(() => (pageCurrent.value > pageCount.value ? pageCount.value : pageCurrent.value < 1 ? 1 : pageCurrent.value))
    const pageCount = computed(() => (files.value.length > pageCountItem.value ? Math.floor(files.value.length / pageCountItem.value) : 1))
    const filesPage = computed(() => files.value.slice((pageId.value - 1) * pageCountItem.value, pageId.value * pageCountItem.value))

    return { isLoading, loadFiles, pageCurrent, pageCountItem, files, goTo, pageId, pageCount, filesPage }
}
