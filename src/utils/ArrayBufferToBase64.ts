export const ArrayBufferToBase64 = (buffer: Uint8Array<ArrayBufferLike>) => {
    const bytes = Array.from(new Uint8Array(buffer))

    return btoa(bytes.map((item) => String.fromCharCode(item)).join(''))
}
