const isError = ref<boolean>(false)
const timeoutId = ref<number>(0)
const notifications = ref<string[]>([])

export const useNotification = () => {
    return { notifications, isError }
}

export const showMessage = (message: string, error = true) => {
    if (isError.value !== error) isError.value = error
    notifications.value.push(message)

    if (notifications.value.length > 5) notifications.value.shift()

    if (timeoutId.value) clearTimeout(timeoutId.value)

    timeoutId.value = setTimeout(() => (notifications.value = []), 10_000)
}
