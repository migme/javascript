module.exports = {
  env: {
    es6: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      'jsx': true,
      'generators': false,
      'objectLiteralDuplicateProperties': false
    }
  },
  rules: {
    'arrow-body-style': [2, 'as-needed'],
    'arrow-parens': [2, 'as-needed'],
    'arrow-spacing': [2, { 'before': true, 'after': true }],
    'constructor-super': 2,
    'comma-dangle': [2, 'always-multiline'],
    'generator-star-spacing': [2, { 'before': true, 'after': true }],
    'no-class-assign': 2,
    'no-confusing-arrow': 2,
    'no-const-assign': 2,
    'no-dupe-class-members': 2,
    'no-this-before-super': 2,
    'no-useless-constructor': 2,
    'no-var': 2,
    'object-shorthand': 2,
    'prefer-arrow-callback': 2,
    'prefer-const': 2,
    'prefer-reflect': 0,
    'prefer-rest-params': 2,
    'prefer-spread': 0,
    'prefer-template': 2,
    'require-yield': 0,
    'sort-imports': 0,
    'template-curly-spacing': 2,
    'yield-star-spacing': [2, 'after']
  }
}
