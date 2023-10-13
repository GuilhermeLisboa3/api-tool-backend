import { Inject, Injectable } from '@nestjs/common'
import { type ListToolsRepository } from '../contracts/database/tools'

type Output = Array<{
  id: number
  name: string
  description: string
  status: string
  dateOfCollection: Date
  dateOfDevolution: Date
  mechanicName: string
}>

export abstract class ListTools {
  abstract list (): Promise<Output>
}

@Injectable()
export class ListToolsUseCase implements ListTools {
  constructor (@Inject('repository') private readonly toolsRepository: ListToolsRepository) {}

  async list (): Promise<Output> {
    return await this.toolsRepository.list()
  }
}
