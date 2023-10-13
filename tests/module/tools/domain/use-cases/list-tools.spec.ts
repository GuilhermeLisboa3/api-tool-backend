import { ListToolsUseCase, type ListTools } from '@/module/tools/domain/use-cases'
import { mock } from 'jest-mock-extended'
import { type ListToolsRepository } from '@/module/tools/domain/contracts/database/tools'
import { toolsParams } from '@/tests/mocks'

describe('ListToolsUseCase', () => {
  let sut: ListTools
  const { id, name, dateOfCollection, dateOfDevolution, description, mechanicName, status } = toolsParams
  const toolsRepository = mock<ListToolsRepository>()

  beforeAll(() => {
    toolsRepository.list.mockResolvedValue([{ id, name, dateOfCollection, dateOfDevolution, description, mechanicName, status }])
  })

  beforeEach(() => {
    sut = new ListToolsUseCase(toolsRepository)
  })

  it('should call ListToolsRepository with correct values', async () => {
    await sut.list()

    expect(toolsRepository.list).toHaveBeenCalledWith()
    expect(toolsRepository.list).toHaveBeenCalledTimes(1)
  })

  it('should return list tools on success', async () => {
    const result = await sut.list()

    expect(result).toEqual([{ id, name, dateOfCollection, dateOfDevolution, description, mechanicName, status }])
  })
})
