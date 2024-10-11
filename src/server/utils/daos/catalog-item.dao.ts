import { ItemBaseType, Prisma } from "@wibbo/prisma"

export const catalogItemDao = {
  getAll: async () => prisma.catalogItem.findMany({ orderBy: { itemId: "asc" } }),
  getOne: async (id: number) => prisma.catalogItem.findFirst({ where: { id } }),
  getOneBySpriteIdAndType: async (id: number, type: ItemBaseType) => prisma.catalogItem.findFirst({ where: { itemBase: { spriteId: id, type } } }),
  remove: async (id: number) => prisma.catalogItem.delete({ where: { id } }),
  removeAll: async (ids: number[]) => prisma.catalogItem.deleteMany({ where: { id: { in: ids } } }),
  update: async (id: number, data: Prisma.CatalogItemUpdateInput) => prisma.catalogItem.update({ where: { id }, data }),
  create: async (data: Prisma.CatalogItemCreateInput) => prisma.catalogItem.create({ data })
}
