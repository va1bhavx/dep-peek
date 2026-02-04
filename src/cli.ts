import { runAudit } from "./index";

const args = process.argv.slice(2);

const targetPath = args.find((arg) => !arg.startsWith("--")) ?? process.cwd();
const isJson = args.includes("--json");
runAudit({
  targetPath,
  isJson,
});
