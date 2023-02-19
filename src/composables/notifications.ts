const isSuccess = ref<boolean>(false)
const timeoutId = ref<number>(0)
const notifications = ref<string[]>([])

export const useNotification = () => {
    return { notifications, isSuccess }
}

export const showMessage = ({ message = '', success = false }) => {
    if (isSuccess.value !== success) isSuccess.value = success
    notifications.value.push(message)

    if (notifications.value.length > 5) notifications.value.shift()

    if (timeoutId.value) clearTimeout(timeoutId.value)

    timeoutId.value = setTimeout(() => (notifications.value = []), 10_000)
}
