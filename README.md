# Cat Olive Webbed Site

Source for [catolive.net](https://catolive.net), a small static personal site built with Eleventy, WebC, Markdown, ordinary CSS, and a little browser-native JavaScript.

The site intentionally keeps the stack close to what browsers consume:

- HTML and Markdown for content
- WebC for build-time HTML composition
- Global CSS files for shared structure and theme rules
- Plain JavaScript for the theme switcher
- Static HTML deployment on GitHub Pages

## Requirements

- Node.js 22 or newer
- npm

## Development

Install the exact dependency tree:

```sh
npm ci
```

Start the local Eleventy server:

```sh
npm run dev
```

Create a production build:

```sh
npm run build
```

Run the build and generated-output tests:

```sh
npm test
```

Both `build` and `dev` remove `_site` before Eleventy starts. This prevents deleted pages and assets from surviving as stale build output.

## Project structure

```text
site/
  index.html                         Home page
  about.md                          Theme-specific About content
  projects.md                       Project descriptions
  includes/layouts/
    main.webc                       Shared document shell
    components/                     WebC navigation, footer, and theme control

pub/themes/
  base.css                          Shared tokens and element rules
  silly.css                         Silly-theme values and presentation
  srs.css                           Serious-theme values and presentation
  components/                       Shared structural component styles

scripts/clean-output.js             Portable clean-build helper
tests/                              Generated-site and build-invariant tests
eleventy.config.js                  Eleventy, WebC, navigation, and theme data
```

`site/` is Eleventy's input directory. `pub/`, `CNAME`, and `.nojekyll` are copied into `_site` for deployment.

## Authoring pages

Pages use Eleventy front matter to select the WebC layout and register navigation metadata:

```yaml
---
layout: main.webc
title: Example Page
eleventyNavigation:
  key: Example
  order: 4
---
```

Markdown files are handled directly by Eleventy. The project does not load MDX, JSX, React, or TSX.

Shared HTML components live in `site/includes/layouts/components/*.webc` and are registered globally by the WebC plugin. Prefer normal shared stylesheets under `pub/themes/` over component-local CSS unless a component has a genuinely isolated styling requirement.

## Theme engine

The current theme engine supports `theme-silly` and `theme-srs`.

Its invariants are:

1. The selected name is stored on `<html data-theme="…">`.
2. A small inline script applies the theme before styles resolve, avoiding a first-load flash.
3. The selection persists under the `localStorage` key `theme`.
4. Unknown or missing values normalize to `theme-srs`.
5. Theme styles primarily change CSS custom properties and theme-specific presentation.
6. `.silly-only` and `.srs-only` allow content variants when wording itself changes by theme.

`themeNames` in `eleventy.config.js` is intentionally retained as the build-time theme catalog. The current client scripts still duplicate parts of that catalog. A future theme-engine pass should make one structured definition the source for:

- stable theme IDs
- visible labels
- default theme selection
- validation and normalization
- switcher ordering
- optional content-variant class names

That refactor should preserve the pre-style bootstrap, explicit state, local persistence, and ordinary CSS output. It should not require a client framework or turn styling into a JavaScript-owned system.

## Tests

The test suite uses Node's built-in test runner. It verifies:

- stale output is removed before a build
- Home, About, and Projects are generated
- the shared page shell is present on every route
- each route has exactly one current navigation item
- internal page and asset references resolve to generated files
- WebC components expand into the expected output
- both About theme variants are present
- description metadata is emitted
- `CNAME` and `.nojekyll` are included in the Pages artifact

Tests intentionally inspect static output without adding a browser framework. Rendered interaction QA is still appropriate when changing navigation, responsive CSS, or the theme engine.

## WebC version policy

`@11ty/eleventy-plugin-webc` is pinned exactly to `0.12.0-beta.7`.

The beta is intentional: it uses the modernized `@11ty/webc` compiler and Nano ID 5.1.x dependency chain, removing the known advisories present in the old stable line. The exact pin prevents an unreviewed prerelease or eventual stable release from changing the build automatically.

When updating WebC:

1. Install the candidate version explicitly.
2. Run `npm audit --audit-level=low`.
3. Run `npm test`.
4. Compare clean generated output when the update is not intended to alter markup.
5. Perform browser QA for navigation and both themes.

## Deployment

Pushes to `main` run `.github/workflows/deploy-to-ghpages.yml`.

The workflow:

1. Installs dependencies with `npm ci` on Node.js 24.
2. Runs `npm test`, which performs a clean production build.
3. Uploads `_site` as the GitHub Pages artifact.
4. Deploys the artifact to Pages.

## Known incomplete work

- `site/includes/layouts/post.html` is only a blog placeholder.
- There is no published blog or post collection yet.
- Theme metadata is not yet shared directly with the browser-side switcher.
- The site has no automated cross-browser interaction test suite.

## License

Mozilla Public License 2.0. See `LICENSE`.
