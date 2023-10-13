import { Module } from '@nestjs/common'
import { ToolsModule } from '@/module/tools/tools.module'

@Module({
  imports: [ToolsModule]
})
export class AppModule {}
