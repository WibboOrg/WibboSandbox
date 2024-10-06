import { ItemBaseType, Prisma } from "@wibbo/prisma"

const useCatalogItemDao = () => {
  const getAll = async () => prisma.catalogItem.findMany({ orderBy: { itemId: "asc" } })
  const getOne = async (id: number) => prisma.catalogItem.findFirst({ where: { id } })
  const getOneBySpriteIdAndType = async (id: number, type: ItemBaseType) => prisma.catalogItem.findFirst({ where: { itemBase: { id, type } } })
  const remove = async (id: number) => prisma.catalogItem.delete({ where: { id } })
  const removeAll = async (ids: number[]) => prisma.catalogItem.deleteMany({ where: { id: { in: ids } } })
  const update = async (id: number, data: Prisma.CatalogItemUpdateInput) => prisma.catalogItem.update({ where: { id }, data })
  const create = async (data: Prisma.CatalogItemCreateInput) => prisma.catalogItem.create({ data })

  return {
    getAll,
    getOne,
    getOneBySpriteIdAndType,
    remove,
    removeAll,
    update,
    create
  }
}

export const catalogItemDao = useCatalogItemDao()
