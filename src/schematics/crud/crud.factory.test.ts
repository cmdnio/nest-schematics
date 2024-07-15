import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import * as path from 'path'
import { CrudOptions } from './crud.schema'

describe('Resource Factory', () => {
  const runner: SchematicTestRunner = new SchematicTestRunner(
    '.',
    path.join(process.cwd(), 'src/collection.json')
  )

  describe('[REST API]', () => {
    it('should generate appropriate files ', async () => {
      const options: CrudOptions = {
        name: 'users',
        path: '',
        module: null,
      }
      const tree = await runner.runSchematic('crud', options)
      const files = tree.files
      expect(files).toEqual([
        '/users/users.controller.spec.ts',
        '/users/users.controller.ts',
        '/users/users.module.ts',
        '/users/users.service.spec.ts',
        '/users/users.service.ts',
        '/users/dto/user.dto.ts',
      ])
    })
  })
})
