export const uploadApi = async (type: uploadApiType, data: uploadApiData) => {
    const config = useRuntimeConfig()

    let result = undefined

    try {
        result = await $fetch<string>((type === 'assets' ? config.urlAssets : config.urlCdn) + config.uploadUrl, { body: data, method: 'post', headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Wibbo/1.0; +https://wibbo.org/)' } })
    } catch (e: unknown) { }

    if (result !== 'ok') {
        return false
    }

    return true
}

type uploadApiType = 'assets' | 'cdn'

type uploadApiData = {
    action: string;
    path: string;
    data?: string;
}[]
