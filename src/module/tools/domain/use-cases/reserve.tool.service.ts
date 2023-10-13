import { NotFoundError, ValidationError } from '@/common/errors'
import { type LoadToolByIdRepository } from '../contracts/database/tools'
import { Inject, Injectable } from '@nestjs/common'

type Input = { id: string, dateOfCollection: string, dateOfDevolution: string, mechanicName: string }
type Output = void
export abstract class ReserveTool {
  abstract reserveTool (input: Input): Promise<Output>
}

@Injectable()
export class ReserveToolUseCase implements ReserveTool {
  constructor (@Inject('repository') private readonly toolRepository: LoadToolByIdRepository) {}

  async reserveTool ({ id, dateOfCollection, dateOfDevolution, mechanicName }: Input): Promise<Output> {
    const tool = await this.toolRepository.loadById({ id: Number(id) })
    if (!tool) throw new NotFoundError('tool')
    const currentDate = new Date()
    const dateOfCollectionTransformData = new Date(dateOfCollection)
    if (dateOfCollectionTransformData < currentDate) {
      throw new ValidationError('It is not possible to reserve a tool before the current date and time. Reserve a tool one hour after the current time.')
    }
    const dateOfDevolutionTransformData = new Date(dateOfDevolution)
    const daysInMilliseconds = 1000 * 60 * 60 * 24
    const millisecondDifference = dateOfDevolutionTransformData.getTime() - dateOfCollectionTransformData.getTime()
    if (millisecondDifference / daysInMilliseconds > 15) {
      throw new ValidationError('You can only reserve a tool for 15 days.')
    }
  }
}
