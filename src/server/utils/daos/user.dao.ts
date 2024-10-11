import { Prisma } from "@wibbo/prisma"

export const userDao = {
  getAll: async () => prisma.user.findMany(),
  getOne: async (id: number) => prisma.user.findFirst({ where: { id } }),
  getOneByName: async (username: string) => prisma.user.findFirst({ where: { username } }),
  remove: async (id: number) => prisma.user.delete({ where: { id } }),
  removeAll: async (ids: number[]) => prisma.user.deleteMany({ where: { id: { in: ids } } }),
  update: async (id: number, data: Prisma.UserUpdateInput) => prisma.user.update({ where: { id }, data }),
  create: async (data: Prisma.UserCreateInput) => prisma.user.create({ data })
}
