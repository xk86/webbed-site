import { rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const defaultOutputPath = fileURLToPath(new URL("../_site", import.meta.url));

export function cleanOutput(outputPath = defaultOutputPath) {
  return rm(outputPath, { force: true, recursive: true });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await cleanOutput();
}
