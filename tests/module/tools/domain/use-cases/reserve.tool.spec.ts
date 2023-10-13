import { type ReserveTool, ReserveToolUseCase } from '@/module/tools/domain/use-cases'
import { toolsParams } from '@/tests/mocks'
import { mock } from 'jest-mock-extended'
import { type LoadToolByIdRepository } from '@/module/tools/domain/contracts/database/tools'
import { NotFoundError } from '@/common/errors'

describe('ReserveToolUseCase', () => {
  let sut: ReserveTool
  const toolsRepository = mock<LoadToolByIdRepository >()
  const { id, mechanicName, name, description, status } = toolsParams
  const dateOfCollection = '2023-10-13'
  const dateOfDevolution = '2023-10-28'
  const StringId = String(id)

  beforeAll(() => {
    toolsRepository.loadById.mockResolvedValue({ id, name, dateOfCollection: new Date(dateOfCollection), dateOfDevolution: new Date(dateOfDevolution), description, mechanicName, status })
  })

  beforeEach(() => {
    sut = new ReserveToolUseCase(toolsRepository)
  })

  it('should call LoadToolByIdRepository with correct values', async () => {
    await sut.reserveTool({ id: StringId, dateOfCollection, dateOfDevolution, mechanicName })

    expect(toolsRepository.loadById).toHaveBeenCalledWith({ id })
    expect(toolsRepository.loadById).toHaveBeenCalledTimes(1)
  })

  it('should throw NotFoundError if LoadToolByIdRepository return undefined', async () => {
    toolsRepository.loadById.mockResolvedValueOnce(undefined)

    const promise = sut.reserveTool({ id: StringId, dateOfCollection, dateOfDevolution, mechanicName })

    await expect(promise).rejects.toThrow(new NotFoundError('tool'))
  })
})
