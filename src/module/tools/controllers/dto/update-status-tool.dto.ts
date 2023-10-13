import { IsNotEmpty, Validate } from 'class-validator'
import { IsStatusValidation } from '../../validation'

export class UpdateStatusToolDto {
  @IsNotEmpty()
  @Validate(IsStatusValidation)
    status: 'available' | 'reserved' | 'inUse'
}
