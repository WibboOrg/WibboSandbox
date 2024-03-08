import { Prisma } from "wibboprisma"

export const useItemBaseDao = () => {
  const getAll = async () => prisma.itemBase.findMany()
  const getOne = async (id: number) => prisma.itemBase.findFirst({ where: { id } })
  const getOneByIdOrName = async (id: number, itemName: string) => prisma.itemBase.findFirst({ where: { OR : [{ id }, { itemName }, { spriteId: id }]} })
  const getLastId = async () => prisma.itemBase.findFirst({ select: { id: true }, orderBy: { id: "desc" }})
  const remove = async (id: number) => prisma.itemBase.delete({ where: { id } })
  const removeAll = async (ids: number[]) => prisma.itemBase.deleteMany({ where: { id: { in: ids } } })
  const update = async (id: number, data: Prisma.ItemBaseUpdateInput) => prisma.itemBase.update({ where: { id }, data })
  const create = async (data: Prisma.ItemBaseCreateInput) => prisma.itemBase.create({ data })

  return {
    getAll,
    getOne,
    getLastId,
    getOneByIdOrName,
    remove,
    removeAll,
    update,
    create
  }
}
