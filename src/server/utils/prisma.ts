import { PrismaClient } from '@wibbo/prisma'

const { databaseUrl } = useRuntimeConfig()
const prisma = new PrismaClient({ datasources: { db: { url: databaseUrl } } })

export default prisma
