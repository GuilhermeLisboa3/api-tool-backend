import { Inject, Injectable } from '@nestjs/common'
import { type CreateToolRepository } from '../contracts/database/tools'

type Input = { name: string, description: string }
type Output = void

export abstract class AddTool {
  abstract add (input: Input): Promise<Output>
}

@Injectable()
export class AddToolUseCase implements AddTool {
  constructor (@Inject('repository') private readonly toolsRepository: CreateToolRepository) {}

  async add (input: Input): Promise<Output> {
    await this.toolsRepository.create(input)
  }
}
