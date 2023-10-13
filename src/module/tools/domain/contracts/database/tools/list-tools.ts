export interface ListToolsRepository {
  list: () => Promise<ListToolsRepository.Output>
}

export namespace ListToolsRepository {
  export type Output = Array<{
    id: number
    name: string
    description: string
    status: string
    dateOfCollection: Date
    dateOfDevolution: Date
    mechanicName: string
  }>
}
