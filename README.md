<p align="center">
  <img src="https://raw.githubusercontent.com/tracecss/trace/v0.1.2/assets/trace-logo.svg" width="128" height="128" alt="Trace CSS logo" />
</p>

<h1 align="center">Trace CSS</h1>

<p align="center">Native HTML elements, CSS tokens, and light and dark themes.</p>

<p align="center">
  <a href="https://www.npmjs.com/package/trace-css"><img src="https://img.shields.io/npm/v/trace-css" alt="npm version" /></a>
  <a href="https://github.com/tracecss/trace/actions/workflows/ci.yml"><img src="https://github.com/tracecss/trace/actions/workflows/ci.yml/badge.svg?branch=main&amp;event=push" alt="CI on main" /></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT license" /></a>
</p>

A CSS library for native HTML elements. No JavaScript required.

## Features

- Native HTML styling with optional class-based extensions.
- Light and dark themes with customizable CSS tokens.
- Global and container-scoped builds.

## Installation

### Via a package manager

Install with your preferred package manager:

```sh
# npm
npm install trace-css

# pnpm
pnpm add trace-css

# Yarn
yarn add trace-css

# Bun
bun add trace-css
```

Import the stylesheet in your application:

```js
import "trace-css";
```

For classless styling, use `trace-css/dist/trace.classless.css` instead.

### Via CDN

Add one stylesheet to your HTML `<head>`:

**jsDelivr**

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/trace-css@0.1.2/dist/trace.min.css"
/>
```

**UNPKG**

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/trace-css@0.1.2/dist/trace.min.css"
/>
```

Replace the filename to use another [build](#builds).

## Builds

Choose one build from `dist/`:

| Build                 | Includes                           | Scope                  | CSS file                          |
| --------------------- | ---------------------------------- | ---------------------- | --------------------------------- |
| Full                  | Native elements + class extensions | Document               | `trace.css`                       |
| Classless             | Native elements                    | Document               | `trace.classless.css`             |
| Full Conditional      | Native elements + class extensions | `.trace-css` container | `trace.conditional.css`           |
| Classless Conditional | Native elements                    | `.trace-css` container | `trace.classless.conditional.css` |

All builds include theme tokens. Minified versions use `.min.css`.
Conditional builds require browser support for `@scope`.

## Agent skill

The [Trace CSS skill](skills/trace-css/SKILL.md) helps coding agents use the library.
Install it in your project:

```sh
npx skills add tracecss/trace --skill trace-css
```

Add `-g` to install globally. Invoke with `$trace-css`.

## Browser targets

Chrome / Edge 123+, Firefox 146+, Safari / iOS Safari 17.5+.
These are build targets, not polyfills.

## License

[MIT](./LICENSE).
