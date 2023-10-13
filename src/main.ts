import './config/module-alias'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import prisma from '@/config/prisma'

prisma.$connect().then(() => {
  NestFactory.create(AppModule).then(async app => {
    await app.listen(3000)
  }).catch(error => { console.log(error) })
}).catch(error => { console.log(error) })
