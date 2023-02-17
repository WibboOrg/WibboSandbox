export const Base64ToArrayBuffer = (base64: string) => {
    if (base64.startsWith('data:image/png;base64,')) base64 = base64.split('data:image/png;base64,')[1]

    return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0))
}
