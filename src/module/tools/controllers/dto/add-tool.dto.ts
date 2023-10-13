import { IsNotEmpty, IsString } from 'class-validator'

export class AddToolDto {
  @IsNotEmpty()
  @IsString()
    name: string

  @IsNotEmpty()
  @IsString()
    description: string
}
