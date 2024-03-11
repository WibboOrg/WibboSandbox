import { Prisma } from "wibboprisma"

const useUserDao = () => {
  const getAll = async () => prisma.user.findMany()
  const getOne = async (id: number) => prisma.user.findFirst({ where: { id } })
  const getOneByName = async (username: string) => prisma.user.findFirst({ where: { username } })
  const remove = async (id: number) => prisma.user.delete({ where: { id } })
  const removeAll = async (ids: number[]) => prisma.user.deleteMany({ where: { id: { in: ids } } })
  const update = async (id: number, data: Prisma.UserUpdateInput) => prisma.user.update({ where: { id }, data })
  const create = async (data: Prisma.UserCreateInput) => prisma.user.create({ data })

  return {
    getAll,
    getOne,
    getOneByName,
    remove,
    removeAll,
    update,
    create
  }
}

export const userDao = useUserDao()
