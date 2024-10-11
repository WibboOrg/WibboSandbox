import { Prisma } from "@wibbo/prisma"

export const catalogItemLimitedDao = {
  getAll: async () => prisma.catalogItemLimited.findMany(),
  getOne: async (id: number) => prisma.catalogItemLimited.findFirst({ where: { catalogItemId: id } }),
  remove: async (id: number) => prisma.catalogItemLimited.delete({ where: { catalogItemId: id } }),
  removeAll: async (ids: number[]) => prisma.catalogItemLimited.deleteMany({ where: { catalogItemId: { in: ids } } }),
  update: async (id: number, data: Prisma.CatalogItemLimitedUpdateInput) => prisma.catalogItemLimited.update({ where: { catalogItemId: id }, data }),
  create: async (data: Prisma.CatalogItemLimitedCreateInput) => prisma.catalogItemLimited.create({ data })
}
