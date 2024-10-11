import { Prisma } from "@wibbo/prisma"

export const emulatorTextDao = {
  getAll: async () => prisma.emulatorText.findMany(),
  getOne: async (id: number) => prisma.emulatorText.findFirst({ where: { id } }),
  remove: async (id: number) => prisma.emulatorText.delete({ where: { id } }),
  removeAll: async (ids: number[]) => prisma.emulatorText.deleteMany({ where: { id: { in: ids } } }),
  update: async (id: number, data: Prisma.EmulatorTextUpdateInput) => prisma.emulatorText.update({ where: { id }, data }),
  create: async (data: Prisma.EmulatorTextCreateInput) => prisma.emulatorText.create({ data })
}
