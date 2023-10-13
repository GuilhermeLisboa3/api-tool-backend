import { Injectable } from '@nestjs/common'
import { type CreateToolRepository, type ListToolsRepository } from '@/module/tools/domain/contracts/database/tools'
import prisma from '@/config/prisma'

@Injectable()
export class ToolsRepository implements CreateToolRepository, ListToolsRepository {
  async create ({ description, name }: CreateToolRepository.Input): Promise<CreateToolRepository.Output> {
    await prisma.tool.create({ data: { description, name, status: 'available' } })
  }

  async list (): Promise<ListToolsRepository.Output> {
    const result = await prisma.tool.findMany()
    return result
  }
}
