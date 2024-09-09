import { Prisma } from "@wibbo/prisma"

const useEmulatorEconomyDao = () => {
  const getAll = async () => prisma.emulatorEconomy.findMany()
  const getOne = async (id: number) => prisma.emulatorEconomy.findFirst({ where: { id } })
  const remove = async (id: number) => prisma.emulatorEconomy.delete({ where: { id } })
  const removeAll = async (ids: number[]) => prisma.emulatorEconomy.deleteMany({ where: { id: { in: ids } } })
  const update = async (id: number, data: Prisma.EmulatorEconomyUpdateInput) => prisma.emulatorEconomy.update({ where: { id }, data })
  const create = async (data: Prisma.EmulatorEconomyCreateInput) => prisma.emulatorEconomy.create({ data })

  return {
    getAll,
    getOne,
    remove,
    removeAll,
    update,
    create,
  }
}

export const emulatorEconomyDao = useEmulatorEconomyDao()
