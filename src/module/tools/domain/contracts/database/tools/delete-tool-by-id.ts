export interface DeleteToolByIdRepository {
  deleteById: (input: DeleteToolByIdRepository.Input) => Promise<DeleteToolByIdRepository.Output>
}

export namespace DeleteToolByIdRepository {
  export type Input = { id: number }
  export type Output = void
}
