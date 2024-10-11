import { Prisma } from "@wibbo/prisma"

export const emulatorCommandDao = {
  getAll: async () => prisma.emulatorCommand.findMany({ select: { id: true, input: true, minrank: true, descriptionFr: true } }),
  getOne: async (id: number) => prisma.emulatorCommand.findFirst({ where: { id } }),
  remove: async (id: number) => prisma.emulatorCommand.delete({ where: { id } }),
  removeAll: async (ids: number[]) => prisma.emulatorCommand.deleteMany({ where: { id: { in: ids } } }),
  update: async (id: number, data: Prisma.EmulatorCommandUpdateInput) => prisma.emulatorCommand.update({ where: { id }, data }),
  create: async (data: Prisma.EmulatorCommandCreateInput) => prisma.emulatorCommand.create({ data })
}
