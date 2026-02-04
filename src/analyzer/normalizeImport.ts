import { builtinModules } from "module";

export const normalizeImport = (pathName: string): string | null => {
  if (pathName.startsWith(".")) {
    return null;
  }
  if (builtinModules.includes(pathName)) return null;

  if (pathName.startsWith("@")) {
    const [scope, name] = pathName.split("/");
    return scope && name ? `${scope}/${name}` : null;
  }

  const [pkgName] = pathName.split("/");
  return pkgName;
};
