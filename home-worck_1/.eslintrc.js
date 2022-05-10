module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: "latest"
  },
  rules: {
    'array-bracket-newline': [
      'error',
      { minItems: 2 },
    ],
    'array-element-newline': [
      'error',
      { minItems: 2 },
    ],
    'arrow-body-style': 'error',
    'block-scoped-var': 'error',
    complexity: 'error',
    'constructor-super': 'error',
    camelcase: 'off',
    curly: 'error',
    'default-case': 'off',
    'no-case-declarations': 'off',
    'dot-notation': 'error',
    'eol-last': 'error',
    eqeqeq: 'error',
    'guard-for-in': 'off',
    'global-require': 'off',
    indent: [
      'warn',
      2,
      { SwitchCase: 1 },
    ],
    'linebreak-style': 'off',
    'max-classes-per-file': 'off',
    'newline-per-chained-call': 'off',
    'new-parens': 'error',
    'no-alert': 'error',
    'no-duplicate-imports': 'error',
    'no-nested-ternary': 'error',
    'no-mixed-spaces-and-tabs': 'error',
    'no-underscore-dangle': 'off',
    'no-bitwise': 'error',
    'no-caller': 'error',
    'no-cond-assign': 'error',
    'no-console': 'warn',
    'no-else-return': 'error',
    'no-empty': 'off',
    'no-plusplus': 'off',
    'no-empty-functions': 'off',
    'consistent-return': 'off',
    'no-dynamic-require': 'off',
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-fallthrough': 'error',
    'no-floating-decimal': 'error',
    'no-implicit-globals': 'error',
    'no-implied-eval': 'error',
    'no-invalid-this': 'off',
    'no-iterator': 'error',
    'no-labels': 'error',
    'no-lone-blocks': 'error',
    'no-loop-func': 'error',
    'max-len': [
      'error',
      {
        ignoreRegExpLiterals: true,
        ignoreUrls: true,
        comments: 130,
        code: 130,
      },
    ],
    'no-magic-numbers': [
      'off',
      { ignoreArrayIndexes: true },
    ],
    'no-multi-spaces': 'error',
    'no-multi-str': 'error',
    'no-multiple-empty-lines': 'error',
    'no-new': 'error',
    'comma-dangle': 'off',
    'no-new-func': 'error',
    'no-new-wrappers': 'error',
    'no-octal-escape': 'error',
    'no-param-reassign': 'warn',
    'no-proto': 'error',
    'no-return-assign': 'error',
    'no-return-await': 'error',
    'no-restricted-syntax': 'off',
    'no-script-url': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-throw-literal': 'error',
    'no-undef-init': 'error',
    'no-unsafe-finally': 'error',
    'no-unused-expressions': 'error',
    'no-unused-vars': [
      'error',
      { varsIgnorePattern: 'ctx' },
    ],
    'no-use-before-define': [
      'error',
      { functions: false }
    ],
    'no-useless-call': 'error',
    'no-useless-concat': 'error',
    'no-useless-return': 'error',
    'no-var': 'error',
    'no-void': 'error',
    'object-shorthand': 'error',
    'one-var': [
      'error',
      'never',
    ],
    'padding-line-between-statements': 'error',
    'prefer-const': 'error',
    'prefer-object-spread': 'warn',
    'quote-props': [
      'error',
      'as-needed',
    ],
    radix: 'error',
    'require-await': 'error',
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
      },
    ],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        asyncArrow: 'always',
        named: 'never',
      },
    ],
    'use-isnan': 'error',
    'wrap-iife': 'error',
    yoda: 'error',
  },
  overrides: [{
    files: ['**/*.test.js'],
    env: {
      jest: true,
    },
  }],
}
