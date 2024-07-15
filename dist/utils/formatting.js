"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeToKebabOrSnakeCase = normalizeToKebabOrSnakeCase;
function normalizeToKebabOrSnakeCase(str) {
    var _a, _b, _c;
    console.log(str);
    const STRING_DASHERIZE_REGEXP = /\s/g;
    const STRING_DECAMELIZE_REGEXP = /([a-z\d])([A-Z])/g;
    return (_c = (_b = (_a = str === null || str === void 0 ? void 0 : str.trim()) === null || _a === void 0 ? void 0 : _a.replace(STRING_DECAMELIZE_REGEXP, '$1-$2')) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === null || _c === void 0 ? void 0 : _c.replace(STRING_DASHERIZE_REGEXP, '-');
}
