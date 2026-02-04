"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.discoverFiles = void 0;
const fast_glob_1 = __importDefault(require("fast-glob"));
const INCLUDED_PATTERNS = ["**/*.js", "**/*.ts", "**/*.jsx", "**/*.tsx"];
const EXCLUDED_PATTERNS = [
    "**/node_modules/**",
    "**/dist/**",
    "**/build/**",
    "**/coverage/**",
    "**/public/**",
    "**/tmp/**",
    "**/.git/**",
    "**/.vscode/**",
    "**/.gitignore",
];
const discoverFiles = async (targetPath) => {
    const files = await (0, fast_glob_1.default)(INCLUDED_PATTERNS, {
        cwd: targetPath,
        ignore: EXCLUDED_PATTERNS,
        absolute: true,
    });
    return files;
};
exports.discoverFiles = discoverFiles;
