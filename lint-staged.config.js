module.exports = {
  // Auto-format staged files; lint-staged re-stages whatever Prettier rewrites.
  '*.{js,jsx,ts,tsx,json,css,md}': 'prettier --write',
  // tsc checks the whole project via tsconfig.json, not individual files, so
  // the staged filenames lint-staged would normally append are ignored here.
  '*.{ts,tsx}': () => 'tsc --noEmit -p tsconfig.json',
  // Only runs the tests that cover the staged files, not the full suite.
  'src/**/*.{js,jsx,ts,tsx}': 'vitest related --run',
};
