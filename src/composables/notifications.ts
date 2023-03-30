const isSuccess = ref<boolean>(false)
const timeoutId = ref<number>(0)
const notifications = ref<string[]>([])

// const error = useError()

// watch(error, newError => {
//     console.log(newError)
// })

export const useNotification = () => {
    
    const showMessage = ({ message = '', success = false }) => {
        if (isSuccess.value !== success) isSuccess.value = success
    
        notifications.value.push(message)
    
        if (notifications.value.length > 3) notifications.value.shift()
    
        if (timeoutId.value) clearTimeout(timeoutId.value)
    
        timeoutId.value = window.setTimeout(() => (notifications.value = []), 10_000)
    }

    return { notifications, isSuccess, showMessage }
}
