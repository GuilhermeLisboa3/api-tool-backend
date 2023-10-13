import { Injectable } from '@nestjs/common'
import { type CreateToolRepository } from '@/module/tools/domain/contracts/database/tools'
import prisma from '@/config/prisma'

@Injectable()
export class ToolsRepository implements CreateToolRepository {
  async create ({ description, name }: CreateToolRepository.Input): Promise<CreateToolRepository.Output> {
    await prisma.tool.create({ data: { description, name, status: 'available' } })
  }
}
