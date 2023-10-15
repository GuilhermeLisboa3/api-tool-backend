import './config/module-alias'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import prisma from '@/config/prisma'
import { ValidationPipe } from '@nestjs/common'
import { AllExceptionsFilter } from './common/filters'

prisma.$connect().then(() => {
  NestFactory.create(AppModule, { cors: true }).then(async app => {
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
    app.useGlobalFilters(new AllExceptionsFilter())
    await app.listen(3000)
  }).catch(error => { console.log(error) })
}).catch(error => { console.log(error) })
