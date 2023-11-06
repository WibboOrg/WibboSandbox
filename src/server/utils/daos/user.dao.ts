import { prisma, Prisma } from "wibboprisma"

export const useUserDao = () => {
  const getAll = async () => prisma.user.findMany()
  const getOne = async (id: number) => prisma.user.findFirst({ where: { id } })
  const getOneByName = async (username: string) => prisma.user.findFirst({ where: { username } })
  const remove = async (id: number) => prisma.user.delete({ where: { id } })
  const update = async (id: number, data: Prisma.UserUpdateInput) => prisma.user.update({ where: { id }, data })
  const create = async (data: Prisma.UserCreateInput) => prisma.user.create({ data })

  return {
    getAll,
    getOne,
    getOneByName,
    remove,
    update,
    create
  }
}