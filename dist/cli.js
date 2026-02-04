"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const args = process.argv.slice(2);
const targetPath = args.find((arg) => !arg.startsWith("--")) ?? process.cwd();
const isJson = args.includes("--json");
(0, index_1.runAudit)({
    targetPath,
    isJson,
});
