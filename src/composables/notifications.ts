const isError = ref<boolean>(false)
const notifications = ref<string[]>([])

export const useNotification = () => {
    return { notifications, isError }
}

export const showError = (message: string) => {
    isError.value = true
    notifications.value.push(message)
}

export const showSuccess = (message: string) => {
    isError.value = false
    notifications.value.push(message)
}
