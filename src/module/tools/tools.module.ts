import { Module } from '@nestjs/common'
import { ToolsController } from '@/module/tools/controllers/tools.controller'
import { ToolsRepository } from '@/module/tools/infra/database/postgres/repositories'
import { AddTool, AddToolUseCase } from '@/module/tools/domain/use-cases/add-tool.service'

@Module({
  controllers: [ToolsController],
  providers: [
    {
      provide: AddTool,
      useClass: AddToolUseCase
    },
    {
      provide: 'repository',
      useClass: ToolsRepository
    }
  ]
})
export class ToolsModule {}
