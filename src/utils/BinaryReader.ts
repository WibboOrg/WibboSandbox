export class BinaryReader {
    #position: number
    #dataView: DataView

    constructor(buffer: ArrayBuffer) {
        this.#position = 0
        this.#dataView = new DataView(buffer)
    }

    readByte(): number {
        const byte = this.#dataView.getInt8(this.#position)

        this.#position++

        return byte
    }

    readBytes(length: number): BinaryReader {
        const buffer = new BinaryReader(this.#dataView.buffer.slice(this.#position, this.#position + length))

        this.#position += length

        return buffer
    }

    readShort(): number {
        const short = this.#dataView.getInt16(this.#position)

        this.#position += 2

        return short
    }

    readInt(): number {
        const int = this.#dataView.getInt32(this.#position)

        this.#position += 4

        return int
    }

    remaining(): number {
        return this.#dataView.byteLength - this.#position
    }

    toString(): string {
        return new TextDecoder().decode(this.#dataView.buffer)
    }

    toArrayBuffer(): ArrayBuffer {
        return this.#dataView.buffer
    }
}
