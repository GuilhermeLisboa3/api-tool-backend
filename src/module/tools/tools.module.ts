import { Module } from '@nestjs/common'
import { ToolsController } from '@/module/tools/controllers/tools.controller'
import { ToolsRepository } from '@/module/tools/infra/database/postgres/repositories'
import { AddTool, AddToolUseCase, ListTools, ListToolsUseCase } from '@/module/tools/domain/use-cases/'

@Module({
  controllers: [ToolsController],
  providers: [
    {
      provide: AddTool,
      useClass: AddToolUseCase
    },
    {
      provide: ListTools,
      useClass: ListToolsUseCase
    },
    {
      provide: 'repository',
      useClass: ToolsRepository
    }
  ]
})
export class ToolsModule {}
