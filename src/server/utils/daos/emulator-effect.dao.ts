import { Prisma } from "@wibbo/prisma"

const useEmulatorEffectDao = () => {
  const getAll = async () => prisma.emulatorEffect.findMany()
  const getOne = async (id: number) => prisma.emulatorEffect.findFirst({ where: { id } })
  const remove = async (id: number) => prisma.emulatorEffect.delete({ where: { id } })
  const removeAll = async (ids: number[]) => prisma.emulatorEffect.deleteMany({ where: { id: { in: ids } } })
  const update = async (id: number, data: Prisma.EmulatorEffectUpdateInput) => prisma.emulatorEffect.update({ where: { id }, data })
  const create = async (data: Prisma.EmulatorEffectCreateInput) => prisma.emulatorEffect.create({ data })

  return {
    getAll,
    getOne,
    remove,
    removeAll,
    update,
    create
  }
}

export const emulatorEffectDao = useEmulatorEffectDao()
