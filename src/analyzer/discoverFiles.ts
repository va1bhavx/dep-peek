import fg from "fast-glob";

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

export const discoverFiles = async (targetPath: string): Promise<string[]> => {
  const files = await fg(INCLUDED_PATTERNS, {
    cwd: targetPath,
    ignore: EXCLUDED_PATTERNS,
    absolute: true,
  });
  return files;
};
