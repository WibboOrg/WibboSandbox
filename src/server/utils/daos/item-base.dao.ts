import { Prisma } from "@wibbo/prisma"

export const itemBaseDao = {
  getAll: async () => prisma.itemBase.findMany(),
  getOne: async (id: number) => prisma.itemBase.findFirst({ where: { id } }),
  getOneBySpriteIdOrName: async (id: number, itemName: string) => prisma.itemBase.findFirst({ where: { OR : [{ itemName }, { spriteId: id }]} }),
  getLastSpriteId: async () => prisma.itemBase.findFirst({ select: { spriteId: true }, orderBy: { spriteId: "desc" }}),
  remove: async (id: number) => prisma.itemBase.delete({ where: { id } }),
  removeAll: async (ids: number[]) => prisma.itemBase.deleteMany({ where: { id: { in: ids } } }),
  update: async (id: number, data: Prisma.ItemBaseUpdateInput) => prisma.itemBase.update({ where: { id }, data }),
  create: async (data: Prisma.ItemBaseCreateInput) => prisma.itemBase.create({ data })
}
