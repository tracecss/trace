/** @type {import("stylelint").Config} */
export default {
  extends: ["stylelint-config-standard"],
  ignoreFiles: ["node_modules/**", "dist/**", "out/**", "coverage/**"],
  rules: {
    "import-notation": "string",
    // Preserve the palette's precision and unitless OKLCH notation.
    "number-max-precision": null,
    "lightness-notation": "number",
    "hue-degree-notation": "number",
    // Formatting and visual grouping are handled by Prettier and the author.
    "custom-property-empty-line-before": null,
    "declaration-empty-line-before": null,
    "rule-empty-line-before": null,
    "selector-not-notation": null,
    "declaration-block-no-redundant-longhand-properties": null,
    // Internal component properties use --_trace-*; public ones use --trace-*.
    "custom-property-pattern": "^_?trace-[a-z0-9]+(?:-[a-z0-9]+)*$",
    "value-keyword-case": [
      "lower",
      { ignoreKeywords: ["Menlo", "Consolas", "currentColor"] },
    ],
    // Native controls still need explicit WebKit appearance declarations.
    "property-no-vendor-prefix": [
      true,
      { ignoreProperties: ["-webkit-appearance"] },
    ],
    "declaration-property-value-no-unknown": [
      true,
      { ignoreProperties: { "-webkit-appearance": ["auto"] } },
    ],
  },
  overrides: [
    {
      files: ["src/variables.css"],
      rules: {
        "comment-empty-line-before": [
          "always",
          {
            except: ["first-nested"],
            ignore: ["stylelint-commands", "after-comment"],
          },
        ],
      },
    },
    {
      files: ["src/forms/input.css"],
      // Nested help-text states intentionally precede the shared small rule.
      rules: { "no-descending-specificity": null },
    },
  ],
};
