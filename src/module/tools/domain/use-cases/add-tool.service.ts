import { type CreateToolRepository } from '../contracts/database/tools'

type Input = { name: string, description: string }
type Output = void

export abstract class AddTool {
  abstract add (input: Input): Promise<Output>
}

export class AddToolUseCase implements AddTool {
  constructor (private readonly toolsRepository: CreateToolRepository) {}

  async add (input: Input): Promise<void> {
    await this.toolsRepository.create(input)
  }
}
