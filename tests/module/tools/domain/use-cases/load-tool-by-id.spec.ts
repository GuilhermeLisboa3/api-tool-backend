import { NotFoundError } from '@/common/errors'
import { LoadToolByIdUseCase, type LoadToolById } from '@/module/tools/domain/use-cases'
import { toolsParams } from '@/tests/mocks'
import { mock } from 'jest-mock-extended'
import { type LoadToolByIdRepository } from '@/module/tools/domain/contracts/database/tools'

describe('LoadToolByIdUseCase', () => {
  let sut: LoadToolById
  const toolsRepository = mock<LoadToolByIdRepository>()
  const { id, name, dateOfCollection, dateOfDevolution, description, mechanicName, status } = toolsParams
  const StringId = String(id)

  beforeAll(() => {
    toolsRepository.loadById.mockResolvedValue({ id, name, dateOfCollection, dateOfDevolution, description, mechanicName, status })
  })

  beforeEach(() => {
    sut = new LoadToolByIdUseCase(toolsRepository)
  })

  it('should call LoadToolByIdRepository with correct values', async () => {
    await sut.loadById({ id: StringId })

    expect(toolsRepository.loadById).toHaveBeenCalledWith({ id })
    expect(toolsRepository.loadById).toHaveBeenCalledTimes(1)
  })

  it('should throw NotFoundError if LoadToolByIdRepository return undefined', async () => {
    toolsRepository.loadById.mockResolvedValueOnce(undefined)

    const promise = sut.loadById({ id: StringId })

    await expect(promise).rejects.toThrow(new NotFoundError('tool'))
  })

  it('should return tool on success', async () => {
    const result = await sut.loadById({ id: StringId })

    expect(result).toEqual({ id, name, dateOfCollection, dateOfDevolution, description, mechanicName, status })
  })
})
