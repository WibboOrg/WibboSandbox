const timeoutId = ref<number>(0)
const notifications = ref<Notification[]>([])

let NOTIFICATION_ID = 0;

export const useNotification = () => {

    const showMessage = ({ message = '', success = false }) => {
        notifications.value.push({ id: NOTIFICATION_ID++, message, success })

        if (notifications.value.length > 5) notifications.value.shift()

        if (timeoutId.value) clearTimeout(timeoutId.value)

        timeoutId.value = window.setTimeout(() => (notifications.value = []), 30_000)
    }

    return { notifications, showMessage }
}

interface Notification {
    id: number
    message: string
    success: boolean
}
