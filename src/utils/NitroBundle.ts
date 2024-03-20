import { inflate, deflate } from 'pako'
import { BinaryReader } from './BinaryReader'
import { BinaryWriter } from './BinaryWriter'

export class NitroBundle {
    static TEXT_DECODER: TextDecoder = new TextDecoder('utf-8')
    static TEXT_ENCODER: TextEncoder = new TextEncoder()

    #files: Record<string, ArrayBuffer> = {}

    parse(arrayBuffer: ArrayBuffer): void {
        const binaryReader = new BinaryReader(arrayBuffer)

        let fileCount = binaryReader.readShort()

        while (fileCount > 0) {
            const fileNameLength = binaryReader.readShort()
            const fileName = binaryReader.readBytes(fileNameLength).toString()
            const fileLength = binaryReader.readInt()
            const buffer = binaryReader.readBytes(fileLength)

            const decompressed = inflate(buffer.toArrayBuffer())
            this.addFile(fileName, decompressed)

            fileCount--
        }
    }

    addFile(fileName: string, data: ArrayBuffer) {
        this.#files[fileName] = data
    }

    async toBufferAsync(): Promise<ArrayBuffer> {
        const buffer = new BinaryWriter()

        buffer.writeShort(this.totalFiles)

        for (const file of Object.entries(this.files)) {
            const fileName = file[0]
            const fileBuffer = file[1]

            buffer.writeString(fileName)

            const compressed = deflate(fileBuffer)
            buffer.writeInt(compressed.length)
            buffer.appendArray(compressed)
        }

        return buffer.getBuffer()
    }

    get files() {
        return this.#files
    }

    get totalFiles(): number {
        return Object.keys(this.files).length
    }
}
