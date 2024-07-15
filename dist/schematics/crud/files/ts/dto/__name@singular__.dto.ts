import { PartialType } from '@nestjs/swagger'
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export const Create<%= singular(classify(name)) %>Schema = z.object({
  name: z.string().min(1).max(255)
})

export class Create<%= singular(classify(name)) %>Dto extends createZodDto(Create<%= singular(classify(name)) %>Schema) {}
export class Update<%= singular(classify(name)) %>Dto extends PartialType(Create<%= singular(classify(name)) %>Dto) {}

