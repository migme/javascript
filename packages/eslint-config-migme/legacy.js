module.exports = {
	extends: [
		'eslint-config-migme/rules/best-practices',
		'eslint-config-migme/rules/errors',
		'eslint-config-migme/rules/legacy',
		'eslint-config-migme/rules/node',
		'eslint-config-migme/rules/style',
		'eslint-config-migme/rules/variables',
	].map(require.resolve),
	env: {
		browser: true,
		node: true,
		amd: false,
		mocha: false,
		jasmine: false
	},
	ecmaFeatures: {},
	globals: {},
	rules: {}
}
