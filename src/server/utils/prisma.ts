import { PrismaClient } from 'wibboprisma'

const config = useRuntimeConfig()
const prisma = new PrismaClient({ datasources: { db: { url: config.databaseUrl } } })

export default prisma
