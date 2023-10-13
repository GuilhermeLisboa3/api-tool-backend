export interface CreateToolRepository {
  create: (input: CreateToolRepository.Input) => Promise<CreateToolRepository.Output>
}

export namespace CreateToolRepository {
  export type Input = { name: string, description: string }
  export type Output = void
}
