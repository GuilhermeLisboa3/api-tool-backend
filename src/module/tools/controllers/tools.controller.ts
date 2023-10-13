import { AddToolDto } from './dto'
import { AddTool } from '../domain/use-cases'

import { Body, Controller, Post, Res } from '@nestjs/common'
import { type Response } from 'express'

@Controller('')
export class ToolsController {
  constructor (
    private readonly addTool: AddTool
  ) {}

  @Post('register')
  async create (@Body() input: AddToolDto, @Res() res: Response): Promise<Response> {
    await this.addTool.add(input)
    return res.status(201).json(null)
  }
}
