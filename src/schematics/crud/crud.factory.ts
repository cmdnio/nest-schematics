import { join, Path, strings } from '@angular-devkit/core'
import { camelize, classify } from '@angular-devkit/core/src/utils/strings'
import {
  apply,
  branchAndMerge,
  chain,
  filter,
  mergeWith,
  move,
  noop,
  Rule,
  SchematicContext,
  SchematicsException,
  Source,
  template,
  Tree,
  url,
} from '@angular-devkit/schematics'
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks'
import * as pluralize from 'pluralize'
import {
  addPackageJsonDependency,
  getPackageJsonDependency,
  NodeDependencyType,
} from '../../utils/dependencies.utils'
import { normalizeToKebabOrSnakeCase } from '../../utils/formatting'
import { Location, NameParser } from '../../utils/name.parser'
import { mergeSourceRoot } from '../../utils/source-root.helpers'
import { CrudOptions } from './crud.schema'
import { ModuleFinder } from '../../utils/module.finder'
import {
  DeclarationOptions,
  ModuleDeclarator,
} from '../../utils/module.declarator'

export function main(options: CrudOptions): Rule {
  options = transform(options)

  return (tree: Tree, context: SchematicContext) => {
    return branchAndMerge(
      chain([
        addMappedTypesDependencyIfApplies(options),
        mergeSourceRoot(options),
        addDeclarationToModule(options),
        mergeWith(generate(options)),
      ])
    )(tree, context)
  }
}

function transform(options: CrudOptions): CrudOptions {
  const target: CrudOptions = Object.assign({}, options)
  if (!target.name) {
    throw new SchematicsException('Option (name) is required.')
  }

  target.metadata = 'imports'

  const location: Location = new NameParser().parse(target)
  target.name = camelize(location.name)
  target.path = camelize(location.path)

  target.path = target.flat
    ? target.path
    : join(target.path as Path, target.name)
  target.isSwaggerInstalled = options.isSwaggerInstalled ?? false

  return target
}

function generate(options: CrudOptions) {
  return (context: SchematicContext) =>
    apply(url(join('./files' as Path, 'ts')), [
      template({
        ...strings,
        ...options,
        lowercased: (name: string) => {
          const classifiedName = classify(name)
          return (
            classifiedName.charAt(0).toLowerCase() + classifiedName.slice(1)
          )
        },
        singular: (name: string) => pluralize.singular(name),
        ent: (name: string) => name + '.entity',
      }),
      move(options.path),
    ])(context)
}

function addDeclarationToModule(options: CrudOptions): Rule {
  return (tree: Tree) => {
    options.module = new ModuleFinder(tree).find({
      name: options.name,
      path: options.path as Path,
    })
    if (options.module) {
      const content = tree.read(options.module)?.toString()
      if (content) {
        const declarator: ModuleDeclarator = new ModuleDeclarator()
        tree.overwrite(
          options.module,
          declarator.declare(content, {
            ...options,
            type: 'module',
          } as DeclarationOptions)
        )
      }
    }
    return tree
  }
}

function addMappedTypesDependencyIfApplies(options: CrudOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    try {
      const swaggerNodeDependencyRef = getPackageJsonDependency(
        host,
        '@nestjs/swagger'
      )
      if (swaggerNodeDependencyRef) {
        options.isSwaggerInstalled = true
        return
      }
      const nodeDependencyRef = getPackageJsonDependency(
        host,
        '@nestjs/mapped-types'
      )
      if (!nodeDependencyRef) {
        addPackageJsonDependency(host, {
          type: NodeDependencyType.Default,
          name: '@nestjs/mapped-types',
          version: '*',
        })
        context.addTask(new NodePackageInstallTask())
      }
    } catch (err) {
      // ignore if "package.json" not found
    }
  }
}
