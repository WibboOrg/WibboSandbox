import { Prisma } from "@wibbo/prisma"

export const logSandboxDao = {
  getAll: async () => prisma.logSandbox.findMany({ include: { user: { select: { username: true } } }}),
  getOne: async (id: number) => prisma.logSandbox.findFirst({ where: { id } }),
  remove: async (id: number) => prisma.logSandbox.delete({ where: { id } }),
  removeAll: async (ids: number[]) => prisma.logSandbox.deleteMany({ where: { id: { in: ids } } }),
  update: async (id: number, data: Prisma.LogSandboxUpdateInput) => prisma.logSandbox.update({ where: { id }, data }),
  create: async (data: Prisma.LogSandboxCreateInput) => prisma.logSandbox.create({ data })
}
