import { IsNotEmpty, IsString, Validate } from 'class-validator'
import { IsDateValidation } from '../../validation'

export class ReserveToolDto {
  @IsNotEmpty()
  @Validate(IsDateValidation)
    dateOfCollection: string

  @IsNotEmpty()
  @Validate(IsDateValidation)
    dateOfDevolution: string

  @IsNotEmpty()
  @IsString()
    mechanicName: string
}
