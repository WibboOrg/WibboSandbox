import { prisma, Prisma } from "wibboprisma"

export const useCatalogItemLimitedDao = () => {
  const getAll = async () => prisma.catalogItemLimited.findMany()
  const getOne = async (id: number) => prisma.catalogItemLimited.findFirst({ where: { catalogItemId: id } })
  const remove = async (id: number) => prisma.catalogItemLimited.delete({ where: { catalogItemId: id } })
  const update = async (id: number, data: Prisma.CatalogItemLimitedUpdateInput) => prisma.catalogItemLimited.update({ where: { catalogItemId: id }, data })
  const create = async (data: Prisma.CatalogItemLimitedCreateInput) => prisma.catalogItemLimited.create({ data })

  return {
    getAll,
    getOne,
    remove,
    update,
    create
  }
}