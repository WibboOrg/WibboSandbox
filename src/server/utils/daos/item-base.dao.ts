import { Prisma } from "@prisma/client"
import prisma from "../database"

export const useItemBaseDao = () => {
  const getAll = async () => prisma.itemBase.findMany()
  const getOne = async (id: number) => prisma.itemBase.findFirst({ where: { id } })
  const remove = async (id: number) => prisma.itemBase.delete({ where: { id } })
  const update = async (id: number, data: Prisma.ItemBaseUpdateInput) => prisma.itemBase.update({ where: { id }, data })
  const create = async (data: Prisma.ItemBaseCreateInput) => prisma.itemBase.create({ data })

  return {
    getAll,
    getOne,
    remove,
    update,
    create
  }
}