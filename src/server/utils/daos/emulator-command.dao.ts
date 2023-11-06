import { prisma, Prisma } from "wibboprisma"

export const useEmulatorCommandDao = () => {
  const getAll = async () => prisma.emulatorCommand.findMany({ select: { id: true, input: true, minrank: true, descriptionFr: true } })
  const getOne = async (id: number) => prisma.emulatorCommand.findFirst({ where: { id } })
  const remove = async (id: number) => prisma.emulatorCommand.delete({ where: { id } })
  const update = async (id: number, data: Prisma.EmulatorCommandUpdateInput) => prisma.emulatorCommand.update({ where: { id }, data })
  const create = async (data: Prisma.EmulatorCommandCreateInput) => prisma.emulatorCommand.create({ data })

  return {
    getAll,
    getOne,
    remove,
    update,
    create
  }
}