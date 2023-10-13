import { type DeleteToolById, DeleteToolByIdUseCase } from '@/module/tools/domain/use-cases'
import { toolsParams } from '@/tests/mocks'
import { mock } from 'jest-mock-extended'
import { type LoadToolByIdRepository } from '@/module/tools/domain/contracts/database/tools'

describe('DeleteToolUseCase', () => {
  let sut: DeleteToolById
  const toolsRepository = mock<LoadToolByIdRepository>()
  const { id } = toolsParams
  const StringId = String(id)

  beforeEach(() => {
    sut = new DeleteToolByIdUseCase(toolsRepository)
  })

  it('should call LoadToolByIdRepository with correct values', async () => {
    await sut.delete({ id: StringId })

    expect(toolsRepository.loadById).toHaveBeenCalledWith({ id })
    expect(toolsRepository.loadById).toHaveBeenCalledTimes(1)
  })
})
