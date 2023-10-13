import { AddToolDto, UpdateStatusToolDto } from './dto'
import { AddTool, DeleteToolById, ListTools, LoadToolById, ReserveTool, UpdateStatusTool } from '../domain/use-cases'

import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common'
import { type Response } from 'express'
import { ReserveToolDto } from './dto/reserve-tool'

@Controller('')
export class ToolsController {
  constructor (
    private readonly addTool: AddTool,
    private readonly listTools: ListTools,
    private readonly loadToolById: LoadToolById,
    private readonly deleteToolById: DeleteToolById,
    private readonly updateStatusTool: UpdateStatusTool,
    private readonly reserveTool: ReserveTool
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

  @Put('tool/:id')
  async updateStatus (@Res() res: Response, @Param('id') id: string, @Body() input: UpdateStatusToolDto): Promise<Response> {
    await this.updateStatusTool.update({ ...input, id })
    return res.status(204).json(null)
  }

  @Put('reserve/tool/:id')
  async reserve (@Res() res: Response, @Param('id') id: string, @Body() input: ReserveToolDto): Promise<Response> {
    await this.reserveTool.reserveTool({ ...input, id })
    return res.status(204).json(null)
  }
}
