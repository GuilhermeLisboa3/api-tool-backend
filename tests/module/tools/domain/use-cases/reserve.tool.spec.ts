import { type ReserveTool, ReserveToolUseCase } from '@/module/tools/domain/use-cases'
import { toolsParams } from '@/tests/mocks'
import { mock } from 'jest-mock-extended'
import { type LoadToolByIdRepository } from '@/module/tools/domain/contracts/database/tools'

describe('ReserveToolUseCase', () => {
  let sut: ReserveTool
  const toolsRepository = mock<LoadToolByIdRepository >()
  const { id, mechanicName } = toolsParams
  const dateOfCollection = new Date('2023-10-13')
  const dateOfDevolution = new Date('2023-10-28')
  const StringId = String(id)

  beforeEach(() => {
    sut = new ReserveToolUseCase(toolsRepository)
  })

  it('should call LoadToolByIdRepository with correct values', async () => {
    await sut.reserveTool({ id: StringId, dateOfCollection, dateOfDevolution, mechanicName })

    expect(toolsRepository.loadById).toHaveBeenCalledWith({ id })
    expect(toolsRepository.loadById).toHaveBeenCalledTimes(1)
  })
})
