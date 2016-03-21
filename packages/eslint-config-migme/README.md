# eslint-config-migme

[![npm version](https://badge.fury.io/js/eslint-config-migme.svg)](https://badge.fury.io/js/eslint-config-migme)

This package provides migme's .eslintrc as an extensible shared config

## Usage

### eslint-config-migme

Our default export contains all of our ESLint rules, including EcmaScript 6+.
It requires `eslint`.

1. `npm install --save-dev eslint-config-migme eslint-plugin-react eslint`
2. add `"extends": "migme"` to your .eslintrc

### eslint-config-migme/base

Lints ES6+ but does not lint React.
It requires `eslint`.

1. `npm install --save-dev eslint-config-migme eslint`
2. add `"extends": "migme/base"` to your .eslintrc

### eslint-config-migme/legacy

Lints ES5 and below. Only requires `eslint`.

1. `npm install --save-dev eslint-config-migme eslint`
2. add `"extends": "migme/legacy"` to your .eslintrc

See [migme's Javascript styleguide](https://github.com/migme/javascript) and
the [ESlint config docs](http://eslint.org/docs/user-guide/configuring#extending-configuration-files)
for more information.
