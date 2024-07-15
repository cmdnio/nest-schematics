import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'
import { Create<%= singular(classify(name)) %>Dto, Update<%= singular(classify(name)) %>Dto } from './dto/<%= singular(name) %>.dto'

@Injectable()
export class <%= classify(name) %>Service {
  constructor(private prisma: PrismaService) {}

  create(dto: Create<%= singular(classify(name)) %>Dto) {
    return this.prisma.<%= singular(camelize(name)) %>.create({
      data: dto
    })
  }

  findAll(params: {
    skip?: number
    take?: number
    cursor?: Prisma.<%= singular(classify(name)) %>WhereUniqueInput
    where?: Prisma.<%= singular(classify(name)) %>WhereInput
    orderBy?: Prisma.<%= singular(classify(name)) %>OrderByWithRelationInput
  }) {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.<%= singular(camelize(name)) %>.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy
    })
  }

  async count(params: { where?: Prisma.<%= singular(classify(name)) %>WhereInput}): Promise<number> {
    const { where } = params
    return this.prisma.<%= singular(camelize(name)) %>.count({ where })
  }

  findOne(where: Prisma.<%= singular(classify(name)) %>WhereUniqueInput) {
    return this.prisma.<%= singular(camelize(name)) %>.findUnique({
      where: where
    })
  }

  update(params: {
    where: Prisma.<%= singular(classify(name)) %>WhereUniqueInput
    dto: Update<%= singular(classify(name)) %>Dto
  }) {
    const { where, dto } = params
    return this.prisma.<%= singular(camelize(name)) %>.update({
      where,
      data: dto
    })
  }


  remove(where: Prisma.<%= singular(classify(name)) %>WhereUniqueInput) {
    return this.prisma.<%= singular(camelize(name)) %>.delete({
      where
    })
  }
}