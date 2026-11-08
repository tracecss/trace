# Integration and themes

## One build per application or integration

| Need                                  | Import                                                     |
| ------------------------------------- | ---------------------------------------------------------- |
| Global native elements and extensions | `import "trace-css";`                                      |
| Global native elements only           | `import "trace-css/dist/trace.classless.css";`             |
| Scoped native elements and extensions | `import "trace-css/dist/trace.conditional.css";`           |
| Scoped native elements only           | `import "trace-css/dist/trace.classless.conditional.css";` |

Use the consumer's existing package manager to install `trace-css` if needed. These are CSS imports supported by bundlers; Trace has no JavaScript exports or initialization call. For a stylesheet-only entry, use the bundler's CSS import convention. Plain HTML can load the corresponding CSS file with `<link rel="stylesheet">`. All four builds have `.min.css` counterparts, including `trace.min.css`.

For CDN usage, pin the version matching the intended API, for example:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/trace-css@0.1.2/dist/trace.min.css"
/>
```

Do not import full plus classless or global plus conditional builds together to obtain missing features. Select the one build with the needed scope and extensions.

A conditional build wraps its CSS in `@scope (.trace-css)` and initializes root tokens and document defaults on the scope container:

```html
<section class="trace-css" data-mode="dark">
  <h2>Embedded settings</h2>
  <label>Name <input name="name" /></label>
  <button type="button">Save</button>
</section>
```

Place dialogs, menus, and other portaled content inside a Trace scope if they should receive scoped styles. Conditional builds scope Trace's selectors; they do not isolate content from the host application's CSS or inherited properties.

The repository's 0.1.2 browser targets are Chrome/Edge 123+, Firefox 146+, Safari/iOS Safari 17.5+. These are build targets, not polyfills; conditional builds additionally require `@scope`. Check the consumer's browser requirements before choosing scoped integration.

## Theme selection

Global builds default to `color-scheme: light dark` on `:root`, using the system preference. Force a theme on `<html>` for the document or on a section for a local region:

```html
<html lang="en" data-mode="dark">
  <!-- application -->
</html>
```

Application code may set `document.documentElement.dataset.mode = "light"` or `"dark"`. Remove the `data-mode` attribute to return to system mode. Trace does not store the choice or supply a toggle component. Avoid inline `color-scheme` declarations that conflict with `data-mode`.

## Customization and cascade

Use global application CSS after the library import. For global builds set defaults on `:root`; for conditional builds set them on the actual `.trace-css` container. Unlayered application declarations normally override Trace's layered declarations.

```css
:root {
  --trace-primary: oklch(0.45 0.12 250);
  --trace-secondary: oklch(0.88 0.15 85);
  --trace-radius-control: 0.5rem;
  --trace-font-body: "Inter", system-ui, sans-serif;
}

/* A specific control override is evaluated on this button. */
.checkout-submit {
  --trace-button-padding-inline: 1.5rem;
}
```

Useful token families (inspect the installed source before using additional names):

| Concern          | Tokens                                                                                                                                          |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Palette          | `--trace-primary`, `--trace-secondary`, `--trace-neutral`, `--trace-danger`, `--trace-success`                                                  |
| Theme            | `--trace-bg-light`, `--trace-bg-dark`, `--trace-text-light`, `--trace-text-dark`, `--trace-bg`, `--trace-text`, `--trace-control-bg`            |
| Fonts            | `--trace-font-body`, `--trace-font-heading`, `--trace-font-code`                                                                                |
| Shape and shadow | `--trace-radius-control`, `--trace-radius-sm`, `--trace-shadow`, `--trace-shadow-color`                                                         |
| Buttons          | `--trace-button-color`, `--trace-button-contrast`, `--trace-button-bg`, `--trace-button-text`, `--trace-button-border`, `--trace-button-radius` |
| Inputs           | `--trace-input-border`, `--trace-input-focus`, `--trace-input-error`, `--trace-input-bg`                                                        |
| Tables           | `--trace-table-accent`, `--trace-table-border`, `--trace-table-stripe-bg`, `--trace-table-hover-bg`                                             |

Palette shades are derived with relative OKLCH colors. Theme colors use `light-dark()`. Custom properties containing `var()` references are resolved where they are declared: changing only a base token on a descendant may leave inherited derived tokens unchanged. Prefer the initialization root for palette/theme-wide changes. For a local override, set the component's consumed tokens directly, or redeclare the relevant derived tokens locally. Variant classes can also declare tokens on the element and supersede inherited values.

A neutral reset in unlayered CSS can beat every layered Trace rule. Inspect computed styles; loading Trace last alone does not resolve layer precedence. If the host needs explicit layer ordering, coordinate the reset, Trace, and application layers in its global stylesheet.

## Source lookup

The package exports its main CSS, `dist/*.css`, `src/*.css` paths, and `package.json`; inspect the installed `exports` before importing individual modules. Prefer complete dist builds for consumer integration. Individual source modules may depend on foundation tokens, other modules, and loader keyframes.

- `src/variables.css`, `src/foundation.css`: tokens, theme selectors, document defaults.
- `src/elements/button.css` and `button.extensions.css`: native buttons and variants.
- `src/forms/<control>.css` and `<control>.extensions.css`: controls and extensions; file input has `file.css`.
- `src/content/`: typography, links, and tables.
- `src/index.css` / `src/classless.css`: exact inclusion lists and layer order.
