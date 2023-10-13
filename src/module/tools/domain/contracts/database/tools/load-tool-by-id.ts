export interface LoadToolByIdRepository {
  loadById: (input: LoadToolByIdRepository.Input) => Promise<LoadToolByIdRepository.Output>
}

export namespace LoadToolByIdRepository {
  export type Input = { id: number }
  export type Output = {
    id: number
    name: string
    description: string
    status: string
    dateOfCollection: Date
    dateOfDevolution: Date
    mechanicName: string
  } | undefined
}
