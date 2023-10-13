import {
  ValidatorConstraint,
  type ValidatorConstraintInterface,
  type ValidationArguments
} from 'class-validator'
import { Injectable } from '@nestjs/common'

@ValidatorConstraint({ name: 'IsDateValidation', async: false })
@Injectable()
export class IsDateValidation implements ValidatorConstraintInterface {
  validate (value: any, args: ValidationArguments): boolean {
    const date = new Date(value)
    return !isNaN(date.getTime())
  }

  defaultMessage (args: ValidationArguments): string {
    return `the ${args.property} property must be of type date`
  }
}
