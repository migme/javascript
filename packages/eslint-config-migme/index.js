module.exports = {
  extends: [
    'eslint-config-migme/base',
    'eslint-config-migme/rules/strict',
  ].map(require.resolve),
  rules: {}
}
