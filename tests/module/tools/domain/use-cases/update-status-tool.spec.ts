import { NotFoundError } from '@/common/errors'
import { type UpdateStatusTool, UpdateStatusToolUseCase } from '@/module/tools/domain/use-cases'
import { toolsParams } from '@/tests/mocks'
import { type UpdateToolRepository, type LoadToolByIdRepository } from '@/module/tools/domain/contracts/database/tools'

import { mock } from 'jest-mock-extended'

describe('UpdateStatusToolUseCase', () => {
  let sut: UpdateStatusTool
  const toolsRepository = mock<LoadToolByIdRepository & UpdateToolRepository>()
  const { id, name, dateOfCollection, dateOfDevolution, description, mechanicName, status } = toolsParams
  const StringId = String(id)

  beforeAll(() => {
    toolsRepository.loadById.mockResolvedValue({ id, name, dateOfCollection, dateOfDevolution, description, mechanicName, status })
  })

  beforeEach(() => {
    sut = new UpdateStatusToolUseCase(toolsRepository)
  })

  it('should call LoadToolByIdRepository with correct values', async () => {
    await sut.update({ id: StringId, status: 'inUse' })

    expect(toolsRepository.loadById).toHaveBeenCalledWith({ id })
    expect(toolsRepository.loadById).toHaveBeenCalledTimes(1)
  })

  it('should throw NotFoundError if LoadToolByIdRepository return undefined', async () => {
    toolsRepository.loadById.mockResolvedValueOnce(undefined)

    const promise = sut.update({ id: StringId, status: 'inUse' })

    await expect(promise).rejects.toThrow(new NotFoundError('tool'))
  })

  it('should call UpdateToolRepository with correct values if status has available', async () => {
    await sut.update({ id: StringId, status: 'available' })

    expect(toolsRepository.update).toHaveBeenCalledWith({ id, status: 'available', dateOfCollection: null, dateOfDevolution: null, mechanicName: null })
    expect(toolsRepository.update).toHaveBeenCalledTimes(1)
  })

  it('should call UpdateToolRepository with correct values', async () => {
    await sut.update({ id: StringId, status: 'inUse' })

    expect(toolsRepository.update).toHaveBeenCalledWith({ id, status: 'inUse' })
    expect(toolsRepository.update).toHaveBeenCalledTimes(1)
  })

  it('should return undefined on success', async () => {
    const result = await sut.update({ id: StringId, status: 'inUse' })

    expect(result).toBeUndefined()
  })
})
