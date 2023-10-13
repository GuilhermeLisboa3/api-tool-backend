export class ServerError extends Error {
  constructor () {
    super('Internal server error')
    this.name = 'ServerError'
  }
}

export class NotFoundError extends Error {
  constructor (fieldName: string) {
    super(`${fieldName} not found.`)
    this.name = 'NotFoundError'
  }
}
