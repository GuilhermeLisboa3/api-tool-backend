import { type LoadToolByIdRepository } from '../contracts/database/tools'
import { Inject, Injectable } from '@nestjs/common'

type Input = { id: string }
type Output = void
export abstract class LoadToolById {
  abstract loadById (input: Input): Promise<Output>
}

@Injectable()
export class LoadToolByIdUseCase implements LoadToolById {
  constructor (@Inject('repository') private readonly toolRepository: LoadToolByIdRepository) {}

  async loadById ({ id }: Input): Promise<Output> {
    await this.toolRepository.loadById({ id: Number(id) })
  }
}
