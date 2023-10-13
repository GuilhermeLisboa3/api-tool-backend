import { type LoadToolByIdRepository } from '../contracts/database/tools'
import { Inject, Injectable } from '@nestjs/common'

type Input = { id: string }
type Output = void
export abstract class UpdateStatusTool {
  abstract update (input: Input): Promise<Output>
}

@Injectable()
export class UpdateStatusToolUseCase implements UpdateStatusTool {
  constructor (@Inject('repository') private readonly toolRepository: LoadToolByIdRepository) {}

  async update ({ id }: Input): Promise<Output> {
    await this.toolRepository.loadById({ id: Number(id) })
  }
}
