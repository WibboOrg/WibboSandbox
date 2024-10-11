import { Prisma } from "@wibbo/prisma"

export const emulatorEconomyDao = {
  getAll: async () => prisma.emulatorEconomy.findMany(),
  getOne: async (id: number) => prisma.emulatorEconomy.findFirst({ where: { id } }),
  remove: async (id: number) => prisma.emulatorEconomy.delete({ where: { id } }),
  removeAll: async (ids: number[]) => prisma.emulatorEconomy.deleteMany({ where: { id: { in: ids } } }),
  update: async (id: number, data: Prisma.EmulatorEconomyUpdateInput) => prisma.emulatorEconomy.update({ where: { id }, data }),
  create: async (data: Prisma.EmulatorEconomyCreateInput) => prisma.emulatorEconomy.create({ data })
}
