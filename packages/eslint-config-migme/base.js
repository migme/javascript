module.exports = {
  extends: [
    'eslint-config-migme/legacy',
    'eslint-config-migme/rules/es6',
  ].map(require.resolve),
  rules: {}
}
