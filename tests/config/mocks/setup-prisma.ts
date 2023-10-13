import { exec } from 'node:child_process'
import NodeEnvironment from 'jest-environment-node'
import { Client } from 'pg'
import * as util from 'node:util'
import * as dotenv from 'dotenv'
import * as path from 'path'
import * as crypto from 'node:crypto'

dotenv.config({ path: '.env.testing' })

const execSync = util.promisify(exec)

const prismaBinary = path.join(__dirname, '../../../node_modules/.bin/prisma')

export default class PrismaTestEnvironment extends NodeEnvironment {
  private readonly schema: string
  private readonly connectionString: string

  constructor (config: any, _context: any) {
    super(config, _context)

    const dbUser = process.env.DATABASE_USER
    const dbPass = process.env.DATABASE_PASS
    const dbHost = process.env.DATABASE_HOST
    const dbPort = process.env.DATABASE_PORT
    const dbName = process.env.DATABASE_NAME

    this.schema = `test_${crypto.randomUUID()}`
    this.connectionString = `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?schema=${this.schema}`
  }

  async setup (): Promise<void> {
    process.env.DATABASE_URL = this.connectionString
    this.global.process.env.DATABASE_URL = this.connectionString

    await execSync(`${prismaBinary} migrate deploy`)

    return await super.setup()
  }

  async teardown (): Promise<void> {
    const client = new Client({
      connectionString: this.connectionString
    })

    await client.connect()
    await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`)
    await client.end()
  }
}
