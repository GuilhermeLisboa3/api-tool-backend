import { Injectable } from '@nestjs/common'
import { type CreateToolRepository, type ListToolsRepository, type LoadToolByIdRepository, type DeleteToolByIdRepository } from '@/module/tools/domain/contracts/database/tools'
import prisma from '@/config/prisma'

@Injectable()
export class ToolsRepository implements CreateToolRepository, ListToolsRepository, LoadToolByIdRepository, DeleteToolByIdRepository {
  async create ({ description, name }: CreateToolRepository.Input): Promise<CreateToolRepository.Output> {
    await prisma.tool.create({ data: { description, name, status: 'available' } })
  }

  async list (): Promise<ListToolsRepository.Output> {
    const result = await prisma.tool.findMany()
    return result
  }

  async loadById ({ id }: LoadToolByIdRepository.Input): Promise<LoadToolByIdRepository.Output> {
    const tool = await prisma.tool.findFirst({ where: { id } })
    return tool ?? undefined
  }

  async deleteById ({ id }: DeleteToolByIdRepository.Input): Promise<DeleteToolByIdRepository.Output> {
    await prisma.tool.delete({ where: { id } })
  }
}
