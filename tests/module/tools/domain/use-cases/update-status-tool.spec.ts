import { type UpdateStatusTool, UpdateStatusToolUseCase } from '@/module/tools/domain/use-cases'
import { toolsParams } from '@/tests/mocks'
import { mock } from 'jest-mock-extended'
import { type LoadToolByIdRepository } from '@/module/tools/domain/contracts/database/tools'

describe('UpdateStatusToolUseCase', () => {
  let sut: UpdateStatusTool
  const toolsRepository = mock<LoadToolByIdRepository>()
  const { id } = toolsParams
  const StringId = String(id)

  beforeEach(() => {
    sut = new UpdateStatusToolUseCase(toolsRepository)
  })

  it('should call LoadToolByIdRepository with correct values', async () => {
    await sut.update({ id: StringId })

    expect(toolsRepository.loadById).toHaveBeenCalledWith({ id })
    expect(toolsRepository.loadById).toHaveBeenCalledTimes(1)
  })
})
