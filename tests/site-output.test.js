import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const outputRoot = join(import.meta.dirname, "..", "_site");
const pages = new Map([
  ["/", { file: "index.html", navLabel: "Home" }],
  ["/about/", { file: "about/index.html", navLabel: "About" }],
  ["/projects/", { file: "projects/index.html", navLabel: "Projects" }],
]);

function readOutput(relativePath) {
  return readFileSync(join(outputRoot, relativePath), "utf8");
}

function outputPathForUrl(pathname) {
  const relativePath = pathname.replace(/^\//, "");

  if (!relativePath || pathname.endsWith("/")) {
    return join(outputRoot, relativePath, "index.html");
  }

  const exactPath = join(outputRoot, relativePath);
  return existsSync(exactPath) ? exactPath : join(exactPath, "index.html");
}

test("build emits the GitHub Pages deployment files", () => {
  assert.equal(readOutput("CNAME").trim(), "catolive.net");
  assert.ok(existsSync(join(outputRoot, ".nojekyll")));
});

for (const [route, { file, navLabel }] of pages) {
  test(`${route} has the complete shared page shell`, () => {
    const html = readOutput(file);

    assert.match(html, /^<!DOCTYPE html>/i);
    assert.match(html, /<html lang="en"/);
    assert.match(html, /<meta name="viewport" content="width=device-width"/);
    assert.match(html, /<meta name="description" content="[^"]+"/);
    assert.match(html, /<header class="site-header">/);
    assert.match(html, /<nav[\s\S]*aria-label="Primary"/);
    assert.match(html, /<main>/);
    assert.match(html, /<button[\s\S]*id="theme-toggle"/);
    assert.match(html, /<footer>/);
    assert.equal(html.match(/aria-current="page"/g)?.length, 1);
    assert.match(
      html,
      new RegExp(`aria-current="page"[^>]*>${navLabel}</a>`),
    );
    assert.doesNotMatch(html, /<(?:site-navbar|site-footer)\b/);
    assert.match(html, /<theme-switcher><button/);
  });

  test(`${route} only references generated local files`, () => {
    const html = readOutput(file);
    const references = html.matchAll(/(?:href|src)=(?:"([^"]+)"|'([^']+)'|([^\s>]+))/g);

    for (const match of references) {
      const reference = match[1] ?? match[2] ?? match[3];
      const url = new URL(reference, `https://site.test${route}`);

      if (url.origin !== "https://site.test" || url.hash) {
        continue;
      }

      assert.ok(
        existsSync(outputPathForUrl(url.pathname)),
        `${route} references missing output: ${reference}`,
      );
    }
  });
}

test("About includes both theme-specific content variants", () => {
  const html = readOutput("about/index.html");

  assert.match(html, /class="silly-only"/);
  assert.match(html, /class="srs-only"/);
});
