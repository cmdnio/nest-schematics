"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
const core_1 = require("@angular-devkit/core");
const strings_1 = require("@angular-devkit/core/src/utils/strings");
const schematics_1 = require("@angular-devkit/schematics");
const tasks_1 = require("@angular-devkit/schematics/tasks");
const pluralize = require("pluralize");
const dependencies_utils_1 = require("../../utils/dependencies.utils");
const name_parser_1 = require("../../utils/name.parser");
const source_root_helpers_1 = require("../../utils/source-root.helpers");
const module_finder_1 = require("../../utils/module.finder");
const module_declarator_1 = require("../../utils/module.declarator");
function main(options) {
    options = transform(options);
    return (tree, context) => {
        return (0, schematics_1.branchAndMerge)((0, schematics_1.chain)([
            addMappedTypesDependencyIfApplies(options),
            (0, source_root_helpers_1.mergeSourceRoot)(options),
            addDeclarationToModule(options),
            (0, schematics_1.mergeWith)(generate(options)),
        ]))(tree, context);
    };
}
function transform(options) {
    var _a;
    const target = Object.assign({}, options);
    if (!target.name) {
        throw new schematics_1.SchematicsException('Option (name) is required.');
    }
    target.metadata = 'imports';
    const location = new name_parser_1.NameParser().parse(target);
    target.name = (0, strings_1.camelize)(location.name);
    target.path = (0, strings_1.camelize)(location.path);
    target.path = target.flat
        ? target.path
        : (0, core_1.join)(target.path, target.name);
    target.isSwaggerInstalled = (_a = options.isSwaggerInstalled) !== null && _a !== void 0 ? _a : false;
    return target;
}
function generate(options) {
    return (context) => (0, schematics_1.apply)((0, schematics_1.url)((0, core_1.join)('./files', 'ts')), [
        (0, schematics_1.template)(Object.assign(Object.assign(Object.assign({}, core_1.strings), options), { lowercased: (name) => {
                const classifiedName = (0, strings_1.classify)(name);
                return (classifiedName.charAt(0).toLowerCase() + classifiedName.slice(1));
            }, singular: (name) => pluralize.singular(name), ent: (name) => name + '.entity' })),
        (0, schematics_1.move)(options.path),
    ])(context);
}
function addDeclarationToModule(options) {
    return (tree) => {
        var _a;
        options.module = new module_finder_1.ModuleFinder(tree).find({
            name: options.name,
            path: options.path,
        });
        if (options.module) {
            const content = (_a = tree.read(options.module)) === null || _a === void 0 ? void 0 : _a.toString();
            if (content) {
                const declarator = new module_declarator_1.ModuleDeclarator();
                tree.overwrite(options.module, declarator.declare(content, Object.assign(Object.assign({}, options), { type: 'module' })));
            }
        }
        return tree;
    };
}
function addMappedTypesDependencyIfApplies(options) {
    return (host, context) => {
        try {
            const swaggerNodeDependencyRef = (0, dependencies_utils_1.getPackageJsonDependency)(host, '@nestjs/swagger');
            if (swaggerNodeDependencyRef) {
                options.isSwaggerInstalled = true;
                return;
            }
            const nodeDependencyRef = (0, dependencies_utils_1.getPackageJsonDependency)(host, '@nestjs/mapped-types');
            if (!nodeDependencyRef) {
                (0, dependencies_utils_1.addPackageJsonDependency)(host, {
                    type: dependencies_utils_1.NodeDependencyType.Default,
                    name: '@nestjs/mapped-types',
                    version: '*',
                });
                context.addTask(new tasks_1.NodePackageInstallTask());
            }
        }
        catch (err) {
        }
    };
}
