type Input = { name: string, description: string }
type Output = void

export abstract class AddTool {
  abstract add (input: Input): Promise<Output>
}
