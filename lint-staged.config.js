/** @type {import("lint-staged").Configuration} */
export default {
  "*": ["prettier --write --ignore-unknown", "editorconfig-checker"],
  "src/**/*.css": "stylelint --max-warnings 0",
};
