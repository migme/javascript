module.exports = {
  extends: [
    './base',
    './rules/strict',
    './rules/preact',
  ].map(require.resolve),
  rules: {},
}
