import { type ReserveTool, ReserveToolUseCase } from '@/module/tools/domain/use-cases'
import { toolsParams } from '@/tests/mocks'
import { mock } from 'jest-mock-extended'
import { type LoadToolByIdRepository, type UpdateToolRepository } from '@/module/tools/domain/contracts/database/tools'
import { NotFoundError, ValidationError } from '@/common/errors'

describe('ReserveToolUseCase', () => {
  let sut: ReserveTool
  const toolsRepository = mock<LoadToolByIdRepository & UpdateToolRepository>()
  const { id, mechanicName, name, description, status } = toolsParams
  const dateOfCollection = '2024-10-14'
  const dateOfDevolution = '2024-10-28'
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

  it('should throw ValidationError if dateOfCollection is less current date', async () => {
    const promise = sut.reserveTool({ id: StringId, dateOfCollection: '2023-10-12', dateOfDevolution, mechanicName })

    await expect(promise).rejects.toThrow(new ValidationError('It is not possible to reserve a tool before the current date and time. Reserve a tool one hour after the current time.'))
  })

  it('should throw ValidationError if dateOfCollection and dateOfDevolution pass 15 days', async () => {
    const promise = sut.reserveTool({ id: StringId, dateOfCollection, dateOfDevolution: '2025-10-30', mechanicName })

    await expect(promise).rejects.toThrow(new ValidationError('You can only reserve a tool for 15 days.'))
  })

  it('should call UpdateToolRepository with correct values', async () => {
    await sut.reserveTool({ id: StringId, dateOfCollection, dateOfDevolution, mechanicName })

    expect(toolsRepository.update).toHaveBeenCalledWith({ id, dateOfCollection: new Date(dateOfCollection), dateOfDevolution: new Date(dateOfDevolution), mechanicName, status: 'reserved' })
    expect(toolsRepository.update).toHaveBeenCalledTimes(1)
  })

  it('should return undefined on success', async () => {
    const result = await sut.reserveTool({ id: StringId, dateOfCollection, dateOfDevolution, mechanicName })

    expect(result).toBeUndefined()
  })
})
