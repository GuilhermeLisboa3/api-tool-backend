import {
  type ExceptionFilter,
  Catch,
  type ArgumentsHost, type HttpException, HttpStatus, BadRequestException
} from '@nestjs/common'
import { ServerError } from '../errors'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  async catch (exception: HttpException, host: ArgumentsHost): Promise<any> {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    let message: any = { error: new ServerError().message }
    let status = HttpStatus.INTERNAL_SERVER_ERROR

    if (exception instanceof BadRequestException) {
      message = exception.getResponse()
      status = HttpStatus.BAD_REQUEST
    }

    response.status(status).json(message)
  }
}
