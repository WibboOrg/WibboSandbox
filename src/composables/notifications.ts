const isError = ref<boolean>(false)
const timeoutId = ref<number>(0)
const notifications = ref<string[]>([])

export const useNotification = () => {
    return { notifications, isError }
}

export const showMessage = (message: string, error = true) => {
    isError.value = error
    notifications.value.push(message)

    clearTimeout(timeoutId.value)

    timeoutId.value = window.setTimeout(() => (notifications.value = []), 30_000)
}
