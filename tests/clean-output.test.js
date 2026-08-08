import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import { cleanOutput } from "../scripts/clean-output.js";

test("cleanOutput removes stale build output", async () => {
  const outputPath = await mkdtemp(join(tmpdir(), "webbed-site-output-"));
  const staleFile = join(outputPath, "removed-page.html");

  await writeFile(staleFile, "stale");
  await cleanOutput(outputPath);

  assert.equal(existsSync(outputPath), false);
});
