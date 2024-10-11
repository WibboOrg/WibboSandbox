import { Prisma } from "@wibbo/prisma"

export const catalogPageDao = {
  getAll: async () => prisma.catalogPage.findMany(),
  getOne: async (id: number) => prisma.catalogPage.findFirst({ where: { id } }),
  remove: async (id: number) => prisma.catalogPage.delete({ where: { id } }),
  removeAll: async (ids: number[]) => prisma.catalogPage.deleteMany({ where: { id: { in: ids } } }),
  update: async (id: number, data: Prisma.CatalogPageUpdateInput) => prisma.catalogPage.update({ where: { id }, data }),
  create: async (data: Prisma.CatalogPageCreateInput) => prisma.catalogPage.create({ data })
}
