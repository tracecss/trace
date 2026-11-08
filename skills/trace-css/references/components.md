# Components and markup

## Native controls and extension classes

Native styling works in every build. Every class in the following table requires a full build (global or conditional).

| Target                                                                        | Supported extension classes                                                                       |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `button`, `input[type="button"/"submit"/"reset"]`                             | `trace-primary`, `trace-secondary`, `trace-danger`, `trace-outline`, `trace-small`, `trace-large` |
| `button`                                                                      | `trace-icon-only`                                                                                 |
| Text-like `input`, `textarea`, `select`, checkbox, radio, range, switch input | `trace-small`, `trace-large`                                                                      |
| Icon wrapper                                                                  | `trace-icon`, optionally `trace-icon-directional` for RTL mirroring                               |
| Standalone loading indicator                                                  | `trace-loader`                                                                                    |
| Input wrapper / its icon children                                             | `trace-input-wrap`, `trace-input-icon-start`, `trace-input-icon-end`                              |
| Select wrapper                                                                | `trace-select`                                                                                    |
| Switch wrapper                                                                | `trace-switch`                                                                                    |
| `table`                                                                       | `trace-striped`, `trace-hover`, `trace-compact`                                                   |
| Numeric `th` or `td`                                                          | `trace-numeric`                                                                                   |
| Table scrolling wrapper                                                       | `trace-table-wrap`                                                                                |

There is no `trace-button`, `trace-input`, `trace-card`, `trace-container`, `trace-row`, `trace-success` button variant, or built-in icon set in 0.1.2. A class name does not imply support on arbitrary elements. Default sizes need no modifier.

## Buttons, icons, and loading

```html
<button type="button" class="trace-danger trace-outline trace-small">
  Delete
</button>
<button type="button" class="trace-icon-only" aria-label="Add item">
  <span class="trace-icon" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M12 5v14M5 12h14" />
    </svg>
  </span>
</button>
<button type="submit" aria-busy="true" disabled>Saving</button>
<span class="trace-loader" role="status" aria-label="Loading"></span>
```

Supply SVG/image content yourself. `trace-icon` sizes direct SVG/image children. `trace-icon-directional` mirrors in RTL; apply only to directional artwork.

Native `button[aria-busy="true"]` displays a loader and visually hides its content without removing its accessible name. In a full build, a direct `span.trace-icon` child receives the loader instead and the button text remains visible. Busy styling is specific to `button`, not submit/reset inputs. Set `disabled` separately when repeated activation must be prevented; ARIA alone does not disable actions.

Native busy overlays also work on `div`, `section`, `article`, `main`, `aside`, `nav`, `header`, `footer`, `form`, `fieldset`, and `figure` with `aria-busy="true"`. These overlays do not provide keyboard locking. Do not rely on them as a modal interaction boundary. Loader tokens are `--trace-loader-size`, `--trace-loader-color`, `--trace-loader-radius`, `--trace-loader-duration`, and `--trace-loader-overlay`; buttons also consume `--trace-button-loader-color`.

## Forms

```html
<label>
  Email
  <input
    type="email"
    name="email"
    required
    aria-invalid="true"
    aria-describedby="email-error"
  />
  <small id="email-error">Enter a valid email address.</small>
</label>
<label>
  Notes
  <textarea name="notes" rows="4"></textarea>
</label>
<label>
  Country
  <select name="country">
    <option value="md">Moldova</option>
    <option value="ro">Romania</option>
  </select>
</label>
<label><input type="checkbox" name="updates" /> Receive updates</label>
<label>
  <input type="checkbox" role="switch" name="notifications" />
  Notifications
</label>
```

Set `aria-invalid="true"` only for an actual error; remove it or set false when valid. Native `:user-invalid` also styles validation errors on supported controls. Keep error text associated with `aria-describedby`. Wrapped label styling frequently depends on direct-child selectors: adding an arbitrary wrapper can break label spacing and state styling. Separate `label[for]` and matching control IDs are also supported; write application layout CSS when needed.

Use native `disabled`, `readonly` where supported, `required`, `checked`, `multiple`, `min`, `max`, and `step`. Radio options share a `name`; group them in a `fieldset` with `legend`. Set checkbox indeterminate state through the DOM `indeterminate` property, not an HTML attribute. File controls use `<input type="file">`, range uses `<input type="range">`; no wrapper is required.

### Input icons and embedded actions (full builds)

```html
<label for="search">Search</label>
<span class="trace-input-wrap">
  <span class="trace-icon trace-input-icon-start" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <circle cx="10" cy="10" r="6" />
      <path d="m15 15 5 5" />
    </svg>
  </span>
  <input id="search" type="search" name="q" />
</span>
```

Keep the input and icon as direct children of `trace-input-wrap`. Icon position classes belong on the same element as `trace-icon`. End icons use `trace-input-icon-end`. A direct child `button type="button"` supports an embedded action such as password visibility; supply its accessible name and application handler. Avoid combining an end icon and end action without resolving their overlapping placement. A wrapper may also sit directly inside a label; use a phrasing element such as `span` there.

### Select and switch wrappers (full builds)

A plain select already has an arrow. Optional `trace-select` uses a masked arrow that reacts to focus/error color. Keep `select` as its direct child:

```html
<label>
  Country
  <span class="trace-select">
    <select name="country" class="trace-small">
      <option value="md">Moldova</option>
    </select>
  </span>
</label>
```

`multiple` or listbox-sized selects retain listbox behavior. The wrapper does not turn them into a custom dropdown.

An optional `trace-switch` wrapper contains a direct `input type="checkbox" role="switch"` and an optional sibling `.trace-icon`. Put size classes on the input. Small switches hide the wrapper icon. The native switch needs no wrapper when there is no icon.

## Tables

```html
<div class="trace-table-wrap" tabindex="0" role="region" aria-label="Invoices">
  <table class="trace-striped trace-hover trace-compact">
    <caption>
      Recent invoices
    </caption>
    <thead>
      <tr>
        <th scope="col">Invoice</th>
        <th scope="col" class="trace-numeric">Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">INV-001</th>
        <td class="trace-numeric">120.00</td>
      </tr>
    </tbody>
  </table>
</div>
```

`trace-numeric` belongs on cells, not the entire column or table. Stripes target odd tbody rows; hover also responds to focus within the row. The wrapper scrolls horizontally and has a focus-visible outline. For classless builds use the native table and application CSS for overflow/variants.

## Typography and links

Use native headings, paragraphs, lists, blockquotes, `code`, `pre`, `kbd`, `mark`, and other semantic text elements. Links are styled via `a[href]`. There is no button-styled anchor extension. Application code supplies page width, layout spacing, responsive grids, and non-native components.
