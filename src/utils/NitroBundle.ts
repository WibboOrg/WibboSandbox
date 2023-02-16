import { Data, inflate, deflate } from 'pako'
import { BinaryReader } from './BinaryReader'
import { BinaryWriter } from './BinaryWriter'

export class NitroBundle {
    static TEXT_DECODER: TextDecoder = new TextDecoder('utf-8')

    #jsonName = ''
    #jsonFile = ''
    #image: Uint8Array | null = null
    #imageName = ''

    parse(arrayBuffer: ArrayBuffer): void {
        const binaryReader = new BinaryReader(arrayBuffer)

        let fileCount = binaryReader.readShort()

        while (fileCount > 0) {
            const fileNameLength = binaryReader.readShort()
            const fileName = binaryReader.readBytes(fileNameLength).toString()
            const fileLength = binaryReader.readInt()
            const buffer = binaryReader.readBytes(fileLength)

            const decompressed = inflate(buffer.toArrayBuffer() as Data)
            if (fileName.endsWith('.json')) {
                this.#jsonName = fileName
                this.#jsonFile = NitroBundle.TEXT_DECODER.decode(decompressed)
            } else {
                this.#imageName = fileName
                this.#image = decompressed
            }

            fileCount--
        }
    }

    changeName(oldName: string, newName: string) {
        this.#jsonName = this.#jsonName.replace(oldName, newName)
        this.#jsonFile = this.#jsonFile.replace(oldName, newName)
        this.#imageName = this.#imageName.replace(oldName, newName)
    }

    async toBufferAsync(): Promise<ArrayBuffer> {
        const buffer = new BinaryWriter()

        buffer.writeShort(this.totalFiles)

        for (const file of this.files) {
            const fileName = file[0] as string
            const fileBuffer = file[1] as Uint8Array

            buffer.writeString(fileName)

            const compressed = deflate(fileBuffer)
            buffer.writeInt(compressed.length)
            buffer.appendArray(compressed)
        }

        return buffer.getBuffer()
    }

    get jsonFile(): string {
        return this.#jsonFile
    }

    get imageFile(): Uint8Array | null {
        return this.#image
    }

    get files() {
        return [
            [this.#jsonName, this.#jsonFile],
            [this.#imageName, this.#image],
        ]
    }

    get totalFiles(): number {
        return Object.keys(this.files).length
    }
}
