import prisma from '@/config/prisma'

export const resetDataBase = async (): Promise<void> => {
  await prisma.$queryRaw`DELETE FROM tools`
}
