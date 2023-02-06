export const sandboxConfig = ref<Record<string, string>>({})

export const getConfig = <T>(key: string) => sandboxConfig.value[key] as T
