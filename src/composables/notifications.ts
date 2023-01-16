const isError = ref<boolean>(false)
const notifications = ref<string[]>([])

export const useNotification = () => {
    return { notifications, isError }
}
