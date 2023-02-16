export class BinaryWriter {
    #buffer: Uint8Array
    #position: number

    constructor() {
        this.#buffer = new Uint8Array()
        this.#position = 0
    }

    writeByte(byte: number): BinaryWriter {
        const array = new Uint8Array(1)

        array[0] = byte

        this.appendArray(array)

        return this
    }

    writeBytes(bytes: ArrayBuffer | number[]): BinaryWriter {
        const array = new Uint8Array(bytes)

        this.appendArray(array)

        return this
    }

    writeShort(short: number): BinaryWriter {
        const array = new Uint8Array(2)

        array[0] = short >> 8
        array[1] = short & 0xff

        this.appendArray(array)

        return this
    }

    writeInt(integer: number): BinaryWriter {
        const array = new Uint8Array(4)

        array[0] = integer >> 24
        array[1] = integer >> 16
        array[2] = integer >> 8
        array[3] = integer & 0xff

        this.appendArray(array)

        return this
    }

    writeString(string: string, includeLength = true): BinaryWriter {
        const array = new TextEncoder().encode(string)

        if (includeLength) {
            this.writeShort(array.length)
            this.appendArray(array)
        } else {
            this.appendArray(array)
        }

        return this
    }

    appendArray(array: Uint8Array): void {
        if (!array) return

        const mergedArray = new Uint8Array(this.#position + array.length > this.#buffer.length ? this.#position + array.length : this.#buffer.length)

        mergedArray.set(this.#buffer)
        mergedArray.set(array, this.#position)

        this.#buffer = mergedArray
        this.#position += array.length
    }

    getBuffer(): ArrayBuffer {
        return this.#buffer.buffer
    }

    toString(encoding?: string): string {
        return new TextDecoder(encoding).decode(this.#buffer)
    }
}
