import { resetDataBase, toolsParams } from '@/tests/mocks'
import { ToolsModule } from '@/module/tools/tools.module'
import prisma from '@/config/prisma'

import * as request from 'supertest'
import { Test } from '@nestjs/testing'
import { ValidationPipe, type INestApplication } from '@nestjs/common'

describe('Tools Route', () => {
  let app: INestApplication
  const { name, description, status: Status } = toolsParams

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
})
