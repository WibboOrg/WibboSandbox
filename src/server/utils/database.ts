import { PrismaClient, createContext } from 'wibboprisma'

const prisma: PrismaClient = (await createContext({})).prisma;

export default prisma