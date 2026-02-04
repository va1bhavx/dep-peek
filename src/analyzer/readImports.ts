import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import fs from "fs";

export const readImports = async (filePath: string): Promise<string[]> => {
  const code = fs.readFileSync(filePath, "utf-8");
  const ast = parse(code, {
    sourceType: "unambiguous",
    plugins: ["typescript", "jsx"],
  });

  const imports: string[] = [];
  traverse(ast, {
    ImportDeclaration(path: any) {
      const source = path.node.source.value;
      imports.push(source);
    },
    CallExpression(path: any) {
      const callee = path.node.callee;

      if (
        callee.type === "Identifier" &&
        callee.name === "require" &&
        path.node.arguments.length === 1
      ) {
        const arg = path.node.arguments[0];
        if (arg.type === "StringLiteral") {
          imports.push(arg.value);
        }
      }
    },
  });

  return imports;
};
