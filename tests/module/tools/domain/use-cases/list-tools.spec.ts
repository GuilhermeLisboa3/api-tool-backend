import { ListToolsUseCase, type ListTools } from '@/module/tools/domain/use-cases'
import { mock } from 'jest-mock-extended'
import { type ListToolsRepository } from '@/module/tools/domain/contracts/database/tools'

describe('ListToolsUseCase', () => {
  let sut: ListTools
  const toolsRepository = mock<ListToolsRepository>()

  beforeEach(() => {
    sut = new ListToolsUseCase(toolsRepository)
  })

  it('should call ListToolsRepository with correct values', async () => {
    await sut.list()

    expect(toolsRepository.list).toHaveBeenCalledWith()
    expect(toolsRepository.list).toHaveBeenCalledTimes(1)
  })
})
