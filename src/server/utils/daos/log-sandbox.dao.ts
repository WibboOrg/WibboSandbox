import { prisma, Prisma } from "wibboprisma"

export const useLogSandboxDao = () => {
  const getAll = async () => prisma.logSandbox.findMany({ include: { user: { select: { username: true } } }})
  const getOne = async (id: number) => prisma.logSandbox.findFirst({ where: { id } })
  const remove = async (id: number) => prisma.logSandbox.delete({ where: { id } })
  const update = async (id: number, data: Prisma.LogSandboxUpdateInput) => prisma.logSandbox.update({ where: { id }, data })
  const create = async (data: Prisma.LogSandboxCreateInput) => prisma.logSandbox.create({ data })

  return {
    getAll,
    getOne,
    remove,
    update,
    create
  }
}