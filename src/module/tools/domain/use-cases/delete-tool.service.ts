import { type LoadToolByIdRepository } from '../contracts/database/tools'
import { Inject, Injectable } from '@nestjs/common'

type Input = { id: string }
type Output = void
export abstract class DeleteToolById {
  abstract delete (input: Input): Promise<Output>
}

@Injectable()
export class DeleteToolByIdUseCase implements DeleteToolById {
  constructor (@Inject('repository') private readonly toolRepository: LoadToolByIdRepository) {}

  async delete ({ id }: Input): Promise<Output> {
    await this.toolRepository.loadById({ id: Number(id) })
  }
}