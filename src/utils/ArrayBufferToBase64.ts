export const ArrayBufferToBase64 = (buffer: ArrayBuffer) => {
    const bytes = Array.from(new Uint8Array(buffer))

    return btoa(bytes.map((item) => String.fromCharCode(item)).join(''))
}
