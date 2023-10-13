import { toolsParams, resetDataBase } from '@/tests/mocks'
import { ToolsRepository } from '@/module/tools/infra/database/postgres/repositories'
import prisma from '@/config/prisma'

describe('ToolsRepository', () => {
  let sut: ToolsRepository
  const { name, description } = toolsParams

  beforeEach(async () => {
    await resetDataBase()
    sut = new ToolsRepository()
  })

  describe('create()', () => {
    it('should create a tools on success', async () => {
      await sut.create({ name, description })

      const user = await prisma.tool.findFirst({ where: { name } })

      expect(user).toBeTruthy()
    })
  })
})
