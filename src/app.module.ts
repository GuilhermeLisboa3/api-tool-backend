import { Module } from '@nestjs/common'
import { ToolsModule } from '@/module/tools/tools.module'
import { APP_PIPE } from '@nestjs/core'
import { ValidationPipe } from './common/pipe'

@Module({
  imports: [ToolsModule],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    }
  ]
})
export class AppModule {}
