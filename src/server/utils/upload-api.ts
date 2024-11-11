import { deflate } from "pako"

export const uploadApi = async (type: UploadApiType, uploadDatas: UploadApiData[]) => {
  const { urlAssets, urlCdn } = useRuntimeConfig().public
  const { uploadUrl } = useRuntimeConfig()

  try {
    const payload = new URLSearchParams()


    uploadDatas.forEach((uploadData, index) => {

      payload.append(`${index}[action]`, uploadData.action)
      payload.append(`${index}[path]`, uploadData.path)
      if (uploadData.data) {
        const dataCompressed = Buffer.from(deflate(uploadData.data)).toString('base64')
        payload.append(`${index}[data]`, dataCompressed)
        payload.append(`${index}[compressed]`, 'true')
      }
    })

    const response = await fetch((type === 'assets' ? urlAssets : urlCdn) + uploadUrl, {
      body: payload,
      method: 'post',
      headers: { 'user-agent': 'Mozilla/5.0 (compatible; Wibbo/1.0; +https://wibbo.org/)' }
    })

    const result = await response.text()

    if (!result || result !== 'ok') {
      return false
    }
  } catch (e: unknown) {
    return false
  }

  return true
}

type UploadApiType = 'assets' | 'cdn'

export type UploadApiData = {
  action: string
  path: string
  data?: string
}

export const uploadCategoryPath: Record<CategoryKey, CategoryValue> = {
  banner: { path: 'images/banner', categoryType: 'assets', ext: 'png' },
  backgrounds: { path: 'c_images/backgrounds', categoryType: 'assets', ext: 'png' },
  badge: { path: 'c_images/album1584', categoryType: 'assets', ext: 'gif' },
  catalogue: { path: 'c_images/catalogue', categoryType: 'assets', ext: 'png' },
  navigator: { path: 'c_images/navigator', categoryType: 'assets', ext: 'png' },
  reception: { path: 'c_images/reception', categoryType: 'assets', ext: 'png' },
  web_promo_small: { path: 'c_images/web_promo_small', categoryType: 'assets', ext: 'png' },
  notifications: { path: 'c_images/notifications', categoryType: 'assets', ext: 'png' },
  wibbopages: { path: 'c_images/wibbopages', categoryType: 'assets', ext: '' },
  icons: { path: 'icons', categoryType: 'assets', ext: 'png' },
  mp3: { path: 'mp3', categoryType: 'assets', ext: 'mp3' },
  thumbnail: { path: 'thumbnails', categoryType: 'assets', ext: 'png' },
  effect: { path: 'bundled/effect', categoryType: 'assets', ext: 'nitro' },
  figure: { path: 'bundled/figure', categoryType: 'assets', ext: 'nitro' },
  furniture: { path: 'bundled/furniture', categoryType: 'assets', ext: 'nitro' },
  generic: { path: 'bundled/generic', categoryType: 'assets', ext: 'nitro' },
  pet: { path: 'bundled/pet', categoryType: 'assets', ext: 'nitro' },

  article: { path: 'web-promo', categoryType: 'cdn', ext: 'png' },
  furni: { path: 'furni', categoryType: 'cdn', ext: 'png' },
  upload: { path: 'uploads', categoryType: 'cdn', ext: 'png' },
  sound: { path: 'sounds', categoryType: 'cdn', ext: 'mp3' }
}
