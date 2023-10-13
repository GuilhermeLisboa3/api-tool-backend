import { Module } from '@nestjs/common'
import { ToolsController } from '@/module/tools/controllers/tools.controller'
import { ToolsRepository } from '@/module/tools/infra/database/postgres/repositories'
import {
  AddTool, AddToolUseCase,
  DeleteToolById, DeleteToolByIdUseCase,
  ListTools, ListToolsUseCase,
  LoadToolById, LoadToolByIdUseCase,
  UpdateStatusTool, UpdateStatusToolUseCase
} from '@/module/tools/domain/use-cases/'

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
      provide: LoadToolById,
      useClass: LoadToolByIdUseCase
    },
    {
      provide: DeleteToolById,
      useClass: DeleteToolByIdUseCase
    },
    {
      provide: UpdateStatusTool,
      useClass: UpdateStatusToolUseCase
    },
    {
      provide: 'repository',
      useClass: ToolsRepository
    }
  ]
})
export class ToolsModule {}
