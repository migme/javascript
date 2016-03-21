module.exports = {
  extends: [
    'eslint-config-migme/base',
    'eslint-config-migme/rules/strict',
    'eslint-config-migme/rules/react',
  ].map(require.resolve),
  rules: {}
}
