import { toolsParams, resetDataBase } from '@/tests/mocks'
import { ToolsRepository } from '@/module/tools/infra/database/postgres/repositories'
import prisma from '@/config/prisma'

describe('ToolsRepository', () => {
  let sut: ToolsRepository
  const { name, description, status } = toolsParams

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

  describe('list()', () => {
    it('should return list tools on success', async () => {
      await prisma.tool.create({ data: { id: 1, name, description, status } })
      const result = await sut.list()

      expect(result).toEqual([{
        id: 1,
        name,
        description,
        status,
        dateOfCollection: null,
        dateOfDevolution: null,
        mechanicName: null
      }])
    })

    it('should return empty list if it has no tools', async () => {
      const result = await sut.list()

      expect(result).toEqual([])
    })
  })
})
