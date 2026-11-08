---
name: trace-css
description: Build, style, and troubleshoot interfaces using the trace-css (Trace CSS) library, including native HTML controls, trace-* extensions, theme tokens, and scoped builds. Use when a project uses trace-css or the user requests it.
---

# Trace CSS

Trace styles native HTML with CSS only. It supplies element styling and optional extensions, not a component runtime, layout grid, icon collection, or JavaScript behaviors. Use semantic HTML and the consuming project's framework conventions. Write application CSS for layouts, cards, navigation, dialogs, and other components without a Trace API; do not invent library classes for them.

## Establish the installed API

This guide describes trace-css 0.1.2. Inspect the consumer's package manifest, lockfile, stylesheet imports, and installed `trace-css/package.json` before changing integration. Installed CSS is authoritative when versions differ. With a conventional node_modules layout, sources are in `node_modules/trace-css/src/`; use the package manager's resolution mechanism otherwise. The package ships readable source and compiled CSS, but the consumer may not have this library's repository or playground.

Read [integration and themes](references/integration.md) for build selection, theme switching, cascade conflicts, and token overrides. Read [components](references/components.md) when writing controls, icons, loaders, or tables. These references work outside the library repository.

## Working rules

- Import exactly one Trace build in the application's global entry. Keep an existing suitable build. Classless builds omit all `trace-*` extensions; conditional builds require a `.trace-css` ancestor/container.
- Start with native elements. Use actual `button`, `input`, `select`, `textarea`, and `table` elements rather than adding similarly named classes to generic elements. Button variants do not style anchors.
- Keep Trace's CSS global even in frameworks with component-scoped styles. Application classes may customize individual components.
- Use `--trace-*` custom properties for appearance. Check the corresponding source file for the exact name and where it is declared or consumed; `--_trace-*` variables are implementation details.
- Themes use `data-mode="light"` / `data-mode="dark"` and CSS `color-scheme`. There is no `.dark` or `data-theme` API. With no explicit mode, the default follows the system preference.
- `aria-busy` supplies loading visuals, not request handling or interaction locking. Application code controls loading, disabled state, validation messages, theme persistence, and password visibility.
- Preserve labels, accessible names, native keyboard behavior, focus indicators, reduced-motion behavior, and error descriptions. Decorative icons use `aria-hidden="true"`; icon-only buttons need an accessible name.

## Diagnose before adding overrides

Check the loaded build and container first, then exact element/attribute/class structure, stylesheet loading, cascade layers, and computed custom properties. Trace uses `:where()` and `@layer trace.foundation, trace.elements, trace.extensions`; unlayered application/reset styles can override it even when Trace loads later. Fix the relevant integration or selector rather than escalating to `!important`.

Verify affected controls in the actual consumer: light/dark, focus/keyboard, disabled/error/busy states as relevant, and narrow screens. Use the consumer's existing checks. When maintaining the library itself, source files are under `src/`, examples under `playground/`; run `pnpm check`, `pnpm build`, and `pnpm check:package` for changes affecting shipped CSS or packaging. Do not edit generated `dist/` as the source of a fix.
