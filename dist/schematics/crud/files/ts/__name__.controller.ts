import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Create<%= singular(classify(name)) %>Dto, Update<%= singular(classify(name)) %>Dto } from './dto/<%= singular(name) %>.dto'
import { <%= classify(name) %>Service } from './<%= name %>.service'

interface <%= classify(name) %>Filter {
  name: string
}

@ApiTags('<%= name %>')
@Controller('<%= name %>')
export class <%= classify(name) %>Controller {
  constructor(private readonly <%= lowercased(name) %>Service: <%= classify(name) %>Service) {}

  @Get()
  async findAll(
    @Query('skip') skip: string,
    @Query('take') take: string,
    @Query('filter') filter: <%= classify(name) %>Filter
  ) {
    const count = await this.<%= lowercased(name) %>Service.count({
      where: {
        name: { contains: filter?.name }
      }
    })

    const result = await this.<%= lowercased(name) %>Service.findAll({
      skip: parseInt(skip),
      take: parseInt(take),
      where: {
        name: { contains: filter?.name }
      }
    })
    return {
      totalCount: count,
      data: result
    }
  }

  @Get('many')
  async findMany(@Query('ids') ids: string[] | string) {
    const result = await this.<%= lowercased(name) %>Service.findAll({
      where: {
        id: { in: Array.isArray(ids) ? ids : [ids] }
      }
    })
    return {
      data: result
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.<%= lowercased(name) %>Service.findOne({ id })
  }

  @Post()
  create(@Body() dto: Create<%= singular(classify(name)) %>Dto) {
    return this.<%= lowercased(name) %>Service.create(dto)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: Update<%= singular(classify(name)) %>Dto) {
    return this.<%= lowercased(name) %>Service.update({
      where: { id },
      dto: dto
    })
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.<%= lowercased(name) %>Service.remove({ id: id })
  }
}