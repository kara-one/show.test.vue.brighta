module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
    amd: true,
    commonjs: true,
  },
  globals: {
    process: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    'ecmaVersion': 2020,
    'sourceType': 'module',
    'parser': 'babel-eslint'
  },
  plugins: [
    'vue',
  ],
  rules: {
    'eqeqeq': 'off',
    'curly': 'error',
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      2, 'always'
    ],
    'no-extra-semi': 'off',
    'indent': ['error', 2]
  },
};