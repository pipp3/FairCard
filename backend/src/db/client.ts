import prismaClient from "../generated/prisma-client/index.js"
import { PrismaPg } from "@prisma/adapter-pg"

const { PrismaClient } = prismaClient

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

export { prisma }