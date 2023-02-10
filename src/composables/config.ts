export const sandboxConfig = ref<Record<string, string>>({})

export const getConfig = <T>(key: string) => sandboxConfig.value[key] as T

const configLoaded = ref(false)

export const loadConfig = async () => {
    if (configLoaded.value) return

    await fetch('/sandbox-config.json')
        .then((res) => res.json())
        .then((res) => (sandboxConfig.value = res))

    configLoaded.value = true
}
