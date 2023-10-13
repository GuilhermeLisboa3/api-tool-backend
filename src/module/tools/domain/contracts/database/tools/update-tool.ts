export interface UpdateToolRepository {
  update: (inpur: UpdateToolRepository.Input) => Promise<UpdateToolRepository.Output>
}

export namespace UpdateToolRepository {
  export type Input = {
    id: number
    name?: string
    description?: string
    status?: 'available' | 'reserved' | 'inUse'
    dateOfCollection?: Date
    dateOfDevolution?: Date
    mechanicName?: string
  }

  export type Output = void
}
