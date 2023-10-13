import { NotFoundError } from '@/common/errors'
import { type LoadToolByIdRepository } from '../contracts/database/tools'
import { Inject, Injectable } from '@nestjs/common'

type Input = { id: string }
type Output = {
  id: number
  name: string
  description: string
  status: string
  dateOfCollection: Date
  dateOfDevolution: Date
  mechanicName: string
}
export abstract class LoadToolById {
  abstract loadById (input: Input): Promise<Output>
}

@Injectable()
export class LoadToolByIdUseCase implements LoadToolById {
  constructor (@Inject('repository') private readonly toolRepository: LoadToolByIdRepository) {}

  async loadById ({ id }: Input): Promise<Output> {
    const tool = await this.toolRepository.loadById({ id: Number(id) })
    if (!tool) throw new NotFoundError('tool')
    return tool
  }
}
