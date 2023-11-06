import { prisma, Prisma } from "wibboprisma"

export const useEmulatorTextDao = () => {
  const getAll = async () => prisma.emulatorText.findMany()
  const getOne = async (id: number) => prisma.emulatorText.findFirst({ where: { id } })
  const remove = async (id: number) => prisma.emulatorText.delete({ where: { id } })
  const update = async (id: number, data: Prisma.EmulatorTextUpdateInput) => prisma.emulatorText.update({ where: { id }, data })
  const create = async (data: Prisma.EmulatorTextCreateInput) => prisma.emulatorText.create({ data })

  return {
    getAll,
    getOne,
    remove,
    update,
    create
  }
}