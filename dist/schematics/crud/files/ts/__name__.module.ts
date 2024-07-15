import { Module } from '@nestjs/common'
import { <%= classify(name) %>Controller } from './<%= name %>.controller'
import { <%= classify(name) %>Service } from './<%= name %>.service'

@Module({
  controllers: [<%= classify(name) %>Controller],
  providers: [<%= classify(name) %>Service]
})
export class <%= classify(name) %>Module {}
