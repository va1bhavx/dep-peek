"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runAudit = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const discoverFiles_1 = require("./analyzer/discoverFiles");
const readImports_1 = require("./analyzer/readImports");
const normalizeImport_1 = require("./analyzer/normalizeImport");
const runAudit = async (options) => {
    const { isJson, targetPath } = options;
    const packageJSONPath = path_1.default.join(targetPath, "package.json");
    if (!fs_1.default.existsSync(packageJSONPath)) {
        throw new Error(`package.json not found at ${packageJSONPath}`);
    }
    const raw = fs_1.default.readFileSync(packageJSONPath, "utf8");
    const pkg = JSON.parse(raw);
    const dependencies = Object.keys(pkg.dependencies ?? {});
    const discoveredFiles = await (0, discoverFiles_1.discoverFiles)(targetPath);
    const usedPackages = new Set();
    for (const file of discoveredFiles) {
        const imports = await (0, readImports_1.readImports)(file);
        for (const imp of imports) {
            const normalizedImp = (0, normalizeImport_1.normalizeImport)(imp);
            if (normalizedImp) {
                usedPackages.add(normalizedImp);
            }
        }
    }
    console.log("\nUsed dependencies:");
    usedPackages.forEach((dep) => {
        console.log(`- ${dep}`);
    });
    const unusedDeps = dependencies.filter((dep) => !usedPackages.has(dep));
    console.log("\nUnused dependencies:");
    unusedDeps.forEach((dep) => {
        console.log(`- ${dep}`);
    });
    if (unusedDeps.length > 0) {
        process.exitCode = 1;
    }
    if (isJson) {
        console.log(JSON.stringify({
            used: [...usedPackages],
            unused: unusedDeps,
        }, null, 2));
        return;
    }
};
exports.runAudit = runAudit;
