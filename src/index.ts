import fs from "fs";
import path from "path";
import { discoverFiles } from "./analyzer/discoverFiles";
import { readImports } from "./analyzer/readImports";
import { normalizeImport } from "./analyzer/normalizeImport";

export type AuditOptions = {
  targetPath: string;
  isJson: boolean;
};

export const runAudit = async (options: AuditOptions) => {
  const { isJson, targetPath } = options;

  const packageJSONPath = path.join(targetPath, "package.json");

  if (!fs.existsSync(packageJSONPath)) {
    throw new Error(`package.json not found at ${packageJSONPath}`);
  }

  const raw = fs.readFileSync(packageJSONPath, "utf8");
  const pkg = JSON.parse(raw);
  const dependencies = Object.keys(pkg.dependencies ?? {});
  const discoveredFiles = await discoverFiles(targetPath);
  const usedPackages = new Set<string>();
  for (const file of discoveredFiles) {
    const imports = await readImports(file);

    for (const imp of imports) {
      const normalizedImp = normalizeImport(imp);
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
    console.log(
      JSON.stringify(
        {
          used: [...usedPackages],
          unused: unusedDeps,
        },
        null,
        2,
      ),
    );
    return;
  }
};
