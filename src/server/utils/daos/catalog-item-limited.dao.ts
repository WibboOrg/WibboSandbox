import { Prisma } from "@prisma/client"
import prisma from "../database"

export const useCatalogItemLimitedDao = () => {
  const getAll = async () => prisma.catalogItemLimited.findMany()
  const getOne = async (id: number) => prisma.catalogItemLimited.findFirst({ where: { catalog_item_id: id } })
  const remove = async (id: number) => prisma.catalogItemLimited.delete({ where: { catalog_item_id: id } })
  const update = async (id: number, data: Prisma.CatalogItemLimitedUpdateInput) => prisma.catalogItemLimited.update({ where: { catalog_item_id: id }, data })
  const create = async (data: Prisma.CatalogItemLimitedCreateInput) => prisma.catalogItemLimited.create({ data })

  return {
    getAll,
    getOne,
    remove,
    update,
    create
  }
}