import { toolsParams, resetDataBase } from '@/tests/mocks'
import { ToolsRepository } from '@/module/tools/infra/database/postgres/repositories'
import prisma from '@/config/prisma'

describe('ToolsRepository', () => {
  let sut: ToolsRepository
  const { name, description, status, dateOfCollection, dateOfDevolution, mechanicName } = toolsParams

  beforeEach(async () => {
    await resetDataBase()
    sut = new ToolsRepository()
  })

  describe('create()', () => {
    it('should create a tools on success', async () => {
      await sut.create({ name, description })

      const tool = await prisma.tool.findFirst({ where: { name } })

      expect(tool).toBeTruthy()
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

  describe('loadById()', () => {
    it('should return tool on success', async () => {
      await prisma.tool.create({ data: { id: 1, name, description, status } })
      const result = await sut.loadById({ id: 1 })

      expect(result).toEqual({
        id: 1,
        name,
        description,
        status,
        dateOfCollection: null,
        dateOfDevolution: null,
        mechanicName: null
      })
    })

    it('should return undefined if tool not exist', async () => {
      const result = await sut.loadById({ id: 1 })

      expect(result).toBeUndefined()
    })
  })

  describe('deleteById()', () => {
    it('should delete tool on success', async () => {
      await prisma.tool.create({ data: { id: 1, name, description, status } })

      await sut.deleteById({ id: 1 })

      const tool = await prisma.tool.findFirst({ where: { id: 1 } })

      expect(tool).toBeFalsy()
    })
  })

  describe('update()', () => {
    it('should update tool on success', async () => {
      await prisma.tool.create({ data: { id: 1, name, description, status: 'inUse', dateOfCollection, dateOfDevolution, mechanicName } })

      await sut.update({ id: 1, dateOfCollection: null, dateOfDevolution: null, mechanicName: null, status: 'reserved' })

      const tool = await prisma.tool.findFirst({ where: { id: 1 } })

      expect(tool).toEqual({
        id: 1,
        name,
        description,
        dateOfCollection: null,
        dateOfDevolution: null,
        mechanicName: null,
        status: 'reserved'
      })
    })
  })
})
