import { Prisma } from "@prisma/client"
import prisma from "../database"

export const useCatalogPageDao = () => {
  const getAll = async () => prisma.catalogPage.findMany()
  const getOne = async (id: number) => prisma.catalogPage.findFirst({ where: { id } })
  const remove = async (id: number) => prisma.catalogPage.delete({ where: { id } })
  const update = async (id: number, data: Prisma.CatalogPageUpdateInput) => prisma.catalogPage.update({ where: { id }, data })
  const create = async (data: Prisma.CatalogPageCreateInput) => prisma.catalogPage.create({ data })

  return {
    getAll,
    getOne,
    remove,
    update,
    create
  }
}