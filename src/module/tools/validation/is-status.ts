import {
  ValidatorConstraint,
  type ValidatorConstraintInterface,
  type ValidationArguments
} from 'class-validator'
import { Injectable } from '@nestjs/common'

@ValidatorConstraint({ name: 'IsStatusValidation', async: false })
@Injectable()
export class IsStatusValidation implements ValidatorConstraintInterface {
  validate (value: any, args: ValidationArguments): boolean {
    if (value !== 'available' && value !== 'reserved' && value !== 'inUse') return false
    return true
  }

  defaultMessage (args: ValidationArguments): string {
    return `the ${args.value} status is not the same as the permitted statuses which are available reserved and inUse`
  }
}
