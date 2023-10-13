import { NotFoundError } from '@/common/errors'
import { type LoadToolByIdRepository, type UpdateToolRepository } from '../contracts/database/tools'
import { Inject, Injectable } from '@nestjs/common'

type Input = { id: string, status: 'available' | 'reserved' | 'inUse' }
type Output = void
export abstract class UpdateStatusTool {
  abstract update (input: Input): Promise<Output>
}

@Injectable()
export class UpdateStatusToolUseCase implements UpdateStatusTool {
  constructor (@Inject('repository') private readonly toolRepository: LoadToolByIdRepository & UpdateToolRepository) {}

  async update ({ id, status }: Input): Promise<Output> {
    const numberId = Number(id)
    const tool = await this.toolRepository.loadById({ id: numberId })
    if (!tool) throw new NotFoundError('tool')
    if (status === 'available') {
      await this.toolRepository.update({ id: numberId, status, dateOfCollection: null, dateOfDevolution: null, mechanicName: null })
    }
  }
}
