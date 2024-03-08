import { Prisma } from "wibboprisma"

export const useCatalogPageDao = () => {
  const getAll = async () => prisma.catalogPage.findMany()
  const getOne = async (id: number) => prisma.catalogPage.findFirst({ where: { id } })
  const remove = async (id: number) => prisma.catalogPage.delete({ where: { id } })
  const removeAll = async (ids: number[]) => prisma.catalogPage.deleteMany({ where: { id: { in: ids } } })
  const update = async (id: number, data: Prisma.CatalogPageUpdateInput) => prisma.catalogPage.update({ where: { id }, data })
  const create = async (data: Prisma.CatalogPageCreateInput) => prisma.catalogPage.create({ data })

  return {
    getAll,
    getOne,
    remove,
    removeAll,
    update,
    create
  }
}
