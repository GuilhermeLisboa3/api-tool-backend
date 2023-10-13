export class ServerError extends Error {
  constructor (error?: Error) {
    super('Internal server error')
    this.name = 'ServerError'
    this.stack = error?.stack
  }
}

export class NotFoundError extends Error {
  constructor (fieldName: string) {
    super(`${fieldName} not found.`)
    this.name = 'NotFoundError'
  }
}
