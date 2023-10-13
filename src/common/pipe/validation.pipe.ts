import { type PipeTransform, Injectable, type ArgumentMetadata, BadRequestException } from '@nestjs/common'
import { validate } from 'class-validator'
import { plainToInstance } from 'class-transformer'

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform (value: any, { metatype }: ArgumentMetadata): Promise<void> {
    if (!metatype || !this.toValidate(metatype as any)) {
      return value
    }
    const object = plainToInstance(metatype, value)
    const errors = await validate(object)
    if (errors.length > 0) {
      const messagensErrors = errors[0].constraints
      const firstMessageError = Object.keys(errors[0].constraints)[0]
      throw new BadRequestException({ error: messagensErrors[firstMessageError] })
    }
    return value
  }

  private toValidate (metatype: () => void): boolean {
    const types: any = [String, Boolean, Number, Array, Object]
    return !types.includes(metatype)
  }
}
