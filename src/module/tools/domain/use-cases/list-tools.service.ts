import { Inject, Injectable } from '@nestjs/common'
import { type ListToolsRepository } from '../contracts/database/tools'

type Output = void

export abstract class ListTools {
  abstract list (): Promise<Output>
}

@Injectable()
export class ListToolsUseCase implements ListTools {
  constructor (@Inject('repository') private readonly toolsRepository: ListToolsRepository) {}

  async list (): Promise<Output> {
    await this.toolsRepository.list()
  }
}
