export const getCategoryAndPath = (category: string) => {
    switch (category) {
        case "backgrounds":
            return { path: 'c_images/backgrounds', categoryType: 'assets', ext: 'png' };
        case "badge":
            return { path: 'c_images/album1584', categoryType: 'assets', ext: 'gif' };
        case "catalogue":
            return { path: 'c_images/catalogue', categoryType: 'assets', ext: 'png' };
        case "navigator":
            return { path: 'c_images/navigator', categoryType: 'assets', ext: 'png' };
        case "reception":
            return { path: 'c_images/reception', categoryType: 'assets', ext: 'png' };
        case "web_promo_small":
            return { path: 'c_images/web_promo_small', categoryType: 'assets', ext: 'png' };
        case "notifications":
            return { path: 'c_images/notifications', categoryType: 'assets', ext: 'png' };
        case "wibbopages":
            return { path: 'c_images/wibbopages', categoryType: 'assets', ext: '' };
        case "icons":
            return { path: 'icons', categoryType: 'assets', ext: 'png' };
        case "mp3":
            return { path: 'mp3', categoryType: 'assets', ext: 'mp3' };
        case "thumbnail":
            return { path: 'thumbnails', categoryType: 'assets', ext: 'png' };
        case "effect":
            return { path: 'bundled/effect', categoryType: 'assets', ext: 'nitro' };
        case "figure":
            return { path: 'bundled/figure', categoryType: 'assets', ext: 'nitro' };
        case "furniture":
            return { path: 'bundled/furniture', categoryType: 'assets', ext: 'nitro' };
        case "generic":
            return { path: 'bundled/generic', categoryType: 'assets', ext: 'nitro' };
        case "pet":
            return { path: 'bundled/pet', categoryType: 'assets', ext: 'nitro' };
        
        case "article":
            return { path: 'web-promo', categoryType: 'cdn', ext: 'png' };
        case "furni":
            return { path: 'furni', categoryType: 'cdn', ext: 'png' };
        case "upload":
            return { path: 'uploads', categoryType: 'cdn', ext: 'png' };
        case "sound":
            return { path: 'sounds', categoryType: 'cdn', ext: 'mp3' };
    }

    return null
}
