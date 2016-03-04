module.exports = {
  extends: [
    'eslint-config-migme/legacy',
    'eslint-config-migme/es6',
  ].map(require.resolve),
  rules: {}
}
