import { Prisma } from "@prisma/client"
import prisma from "../database"

export const useCatalogItemDao = () => {
  const getAll = async () => prisma.catalogItem.findMany()
  const getOne = async (id: number) => prisma.catalogItem.findFirst({ where: { id } })
  const remove = async (id: number) => prisma.catalogItem.delete({ where: { id } })
  const update = async (id: number, data: Prisma.CatalogItemUpdateInput) => prisma.catalogItem.update({ where: { id }, data })
  const create = async (data: Prisma.CatalogItemCreateInput) => prisma.catalogItem.create({ data })

  return {
    getAll,
    getOne,
    remove,
    update,
    create
  }
}