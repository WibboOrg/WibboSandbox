import { Prisma } from "@wibbo/prisma"

export const emulatorEffectDao = {
  getAll: async () => prisma.emulatorEffect.findMany(),
  getOne: async (id: number) => prisma.emulatorEffect.findFirst({ where: { id } }),
  remove: async (id: number) => prisma.emulatorEffect.delete({ where: { id } }),
  removeAll: async (ids: number[]) => prisma.emulatorEffect.deleteMany({ where: { id: { in: ids } } }),
  update: async (id: number, data: Prisma.EmulatorEffectUpdateInput) => prisma.emulatorEffect.update({ where: { id }, data }),
  create: async (data: Prisma.EmulatorEffectCreateInput) => prisma.emulatorEffect.create({ data })
}
