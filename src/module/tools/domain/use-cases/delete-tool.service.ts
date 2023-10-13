import { NotFoundError } from '@/common/errors'
import { type LoadToolByIdRepository, type DeleteToolByIdRepository } from '../contracts/database/tools'
import { Inject, Injectable } from '@nestjs/common'

type Input = { id: string }
type Output = void
export abstract class DeleteToolById {
  abstract delete (input: Input): Promise<Output>
}

@Injectable()
export class DeleteToolByIdUseCase implements DeleteToolById {
  constructor (@Inject('repository') private readonly toolRepository: LoadToolByIdRepository & DeleteToolByIdRepository) {}

  async delete ({ id }: Input): Promise<Output> {
    const numberId = Number(id)
    const tool = await this.toolRepository.loadById({ id: numberId })
    if (!tool) throw new NotFoundError('tool')
    await this.toolRepository.deleteById({ id: numberId })
  }
}
