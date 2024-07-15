"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleMetadataDeclarator = void 0;
const metadata_manager_1 = require("./metadata.manager");
class ModuleMetadataDeclarator {
    declare(content, options) {
        const manager = new metadata_manager_1.MetadataManager(content);
        const inserted = manager.insert(options.metadata, options.symbol, options.staticOptions);
        return inserted !== null && inserted !== void 0 ? inserted : content;
    }
}
exports.ModuleMetadataDeclarator = ModuleMetadataDeclarator;
