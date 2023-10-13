import { AddToolUseCase, type AddTool } from '@/module/tools/domain/use-cases'
import { mock } from 'jest-mock-extended'
import { type CreateToolRepository } from '@/module/tools/domain/contracts/database/tools'
import { toolsParams } from '@/tests/mocks'

describe('AddToolUseCase', () => {
  let sut: AddTool
  const toolsRepository = mock<CreateToolRepository>()
  const { name, description } = toolsParams

  beforeEach(() => {
    sut = new AddToolUseCase(toolsRepository)
  })

  it('should call CreateToolRepository with correct values', async () => {
    await sut.add({ name, description })

    expect(toolsRepository.create).toHaveBeenCalledWith({ name, description })
    expect(toolsRepository.create).toHaveBeenCalledTimes(1)
  })
})
