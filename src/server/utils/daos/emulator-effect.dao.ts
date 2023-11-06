import { prisma, Prisma } from "wibboprisma"

export const useEmulatorEffectDao = () => {
  const getAll = async () => prisma.emulatorEffect.findMany()
  const getOne = async (id: number) => prisma.emulatorEffect.findFirst({ where: { id } })
  const remove = async (id: number) => prisma.emulatorEffect.delete({ where: { id } })
  const update = async (id: number, data: Prisma.EmulatorEffectUpdateInput) => prisma.emulatorEffect.update({ where: { id }, data })
  const create = async (data: Prisma.EmulatorEffectCreateInput) => prisma.emulatorEffect.create({ data })

  return {
    getAll,
    getOne,
    remove,
    update,
    create
  }
}