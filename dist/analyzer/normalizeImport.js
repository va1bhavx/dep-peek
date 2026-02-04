"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeImport = void 0;
const module_1 = require("module");
const normalizeImport = (pathName) => {
    if (pathName.startsWith(".")) {
        return null;
    }
    if (module_1.builtinModules.includes(pathName))
        return null;
    if (pathName.startsWith("@")) {
        const [scope, name] = pathName.split("/");
        return scope && name ? `${scope}/${name}` : null;
    }
    const [pkgName] = pathName.split("/");
    return pkgName;
};
exports.normalizeImport = normalizeImport;
