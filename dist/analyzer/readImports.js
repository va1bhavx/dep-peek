"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readImports = void 0;
const parser_1 = require("@babel/parser");
const traverse_1 = __importDefault(require("@babel/traverse"));
const fs_1 = __importDefault(require("fs"));
const readImports = async (filePath) => {
    const code = fs_1.default.readFileSync(filePath, "utf-8");
    const ast = (0, parser_1.parse)(code, {
        sourceType: "unambiguous",
        plugins: ["typescript", "jsx"],
    });
    const imports = [];
    (0, traverse_1.default)(ast, {
        ImportDeclaration(path) {
            const source = path.node.source.value;
            imports.push(source);
        },
        CallExpression(path) {
            const callee = path.node.callee;
            if (callee.type === "Identifier" &&
                callee.name === "require" &&
                path.node.arguments.length === 1) {
                const arg = path.node.arguments[0];
                if (arg.type === "StringLiteral") {
                    imports.push(arg.value);
                }
            }
        },
    });
    return imports;
};
exports.readImports = readImports;
