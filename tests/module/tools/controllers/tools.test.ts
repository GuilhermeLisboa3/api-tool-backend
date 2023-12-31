import { resetDataBase, toolsParams } from '@/tests/mocks'
import { ToolsModule } from '@/module/tools/tools.module'
import prisma from '@/config/prisma'
import { NotFoundError } from '@/common/errors'
import { AllExceptionsFilter } from '@/common/filters'

import * as request from 'supertest'
import { Test } from '@nestjs/testing'
import { ValidationPipe, type INestApplication } from '@nestjs/common'

describe('Tools Route', () => {
  let app: INestApplication
  const { name, description, status: Status, mechanicName } = toolsParams
  const dateOfCollection = '2025-10-14'
  const dateOfDevolution = '2025-10-28'

  beforeEach(async () => {
    await resetDataBase()
  })

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ToolsModule]
    })
      .compile()

    app = moduleRef.createNestApplication()
    app.useGlobalPipes(new ValidationPipe())
    app.useGlobalFilters(new AllExceptionsFilter())
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  describe('/POST register', () => {
    it('should return 400 if has invalid data', async () => {
      const { status } = await request(app.getHttpServer())
        .post('/register')
        .send({ name })

      expect(status).toBe(400)
    })

    it('should return 201 on success', async () => {
      const { status } = await request(app.getHttpServer())
        .post('/register')
        .send({ name, description })
      expect(status).toBe(201)
    })
  })

  describe('/GET tools', () => {
    it('should return 200 on success', async () => {
      await prisma.tool.create({ data: { id: 1, name, description, status: Status } })
      const { status, body } = await request(app.getHttpServer())
        .get('/tools')
        .send({ name })

      expect(status).toBe(200)
      expect(body).toEqual([{
        id: 1,
        name,
        description,
        status: Status,
        dateOfCollection: null,
        dateOfDevolution: null,
        mechanicName: null
      }])
    })
  })

  describe('/GET tool/:id', () => {
    it('should return 200 on success', async () => {
      await prisma.tool.create({ data: { id: 1, name, description, status: Status } })
      const { status, body } = await request(app.getHttpServer())
        .get('/tool/1')

      expect(status).toBe(200)
      expect(body).toEqual({
        id: 1,
        name,
        description,
        status: Status,
        dateOfCollection: null,
        dateOfDevolution: null,
        mechanicName: null
      })
    })

    it('should return 404 if tool not exists', async () => {
      const { status, body: { error } } = await request(app.getHttpServer())
        .get('/tool/1')

      expect(status).toBe(404)
      expect(error).toEqual(new NotFoundError('tool').message)
    })
  })

  describe('/DELETE tool/:id', () => {
    it('should return 204 on success', async () => {
      await prisma.tool.create({ data: { id: 1, name, description, status: Status } })
      const { status } = await request(app.getHttpServer())
        .delete('/tool/1')

      expect(status).toBe(204)
    })

    it('should return 404 if tool not exists', async () => {
      const { status, body: { error } } = await request(app.getHttpServer())
        .delete('/tool/1')

      expect(status).toBe(404)
      expect(error).toEqual(new NotFoundError('tool').message)
    })
  })

  describe('/PUT tool/:id', () => {
    it('should return 204 on success', async () => {
      await prisma.tool.create({ data: { id: 1, name, description, status: Status } })
      const { status } = await request(app.getHttpServer())
        .put('/tool/1')
        .send({ status: 'inUse' })

      expect(status).toBe(204)
    })

    it('should return 404 if tool not exists', async () => {
      const { status, body: { error } } = await request(app.getHttpServer())
        .put('/tool/1')
        .send({ status: 'inUse' })

      expect(status).toBe(404)
      expect(error).toEqual(new NotFoundError('tool').message)
    })
  })

  describe('/PUT reserve/tool/:id', () => {
    it('should return 204 on success', async () => {
      await prisma.tool.create({ data: { id: 1, name, description, status: Status } })
      const { status } = await request(app.getHttpServer())
        .put('/reserve/tool/1')
        .send({ dateOfCollection, dateOfDevolution, mechanicName })

      expect(status).toBe(204)
    })

    it('should return 404 if tool not exists', async () => {
      const { status, body: { error } } = await request(app.getHttpServer())
        .put('/reserve/tool/1')
        .send({ dateOfCollection, dateOfDevolution, mechanicName })

      expect(status).toBe(404)
      expect(error).toEqual(new NotFoundError('tool').message)
    })
  })
})
