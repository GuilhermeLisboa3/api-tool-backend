import { NotFoundError } from '@/common/errors'
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

  async reserveTool ({ id }: Input): Promise<Output> {
    const tool = await this.toolRepository.loadById({ id: Number(id) })
    if (!tool) throw new NotFoundError('tool')
  }
}
