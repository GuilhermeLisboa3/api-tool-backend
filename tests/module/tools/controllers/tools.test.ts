import { resetDataBase, toolsParams } from '@/tests/mocks'
import { ToolsModule } from '@/module/tools/tools.module'

import * as request from 'supertest'
import { Test } from '@nestjs/testing'
import { ValidationPipe, type INestApplication } from '@nestjs/common'

describe('Tools Route', () => {
  let app: INestApplication
  const { name, description } = toolsParams

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
})
