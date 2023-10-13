import { AddToolDto } from './dto'
import { AddTool, DeleteToolById, ListTools, LoadToolById } from '../domain/use-cases'

import { Body, Controller, Delete, Get, Param, Post, Res } from '@nestjs/common'
import { type Response } from 'express'

@Controller('')
export class ToolsController {
  constructor (
    private readonly addTool: AddTool,
    private readonly listTools: ListTools,
    private readonly loadToolById: LoadToolById,
    private readonly deleteToolById: DeleteToolById
  ) {}

  @Post('register')
  async create (@Body() input: AddToolDto, @Res() res: Response): Promise<Response> {
    await this.addTool.add(input)
    return res.status(201).json(null)
  }

  @Get('tools')
  async list (@Res() res: Response): Promise<Response> {
    const result = await this.listTools.list()
    return res.status(200).json(result)
  }

  @Get('tool/:id')
  async loadById (@Res() res: Response, @Param('id') id: string): Promise<Response> {
    const result = await this.loadToolById.loadById({ id })
    return res.status(200).json(result)
  }

  @Delete('tool/:id')
  async deleteById (@Res() res: Response, @Param('id') id: string): Promise<Response> {
    await this.deleteToolById.delete({ id })
    return res.status(204).json(null)
  }
}
