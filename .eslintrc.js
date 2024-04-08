module.exports = {
  extends: ['react-app', 'plugin:cypress/recommended', 'plugin:prettier/recommended'],
  rules: {
    // Re-delcaring variables will be caught by the typescript compiler
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': 'off',
    'no-debugger': 'error',
    'no-duplicate-imports': 'error',
    'no-unreachable': 'error',
    'no-empty': 'error',
    'no-unneeded-ternary': 'error',
    'no-useless-concat': 'error',
    'no-console': 'warn',
    '@typescript-eslint/no-unused-vars': 'error',
    curly: 'error',
    eqeqeq: ['error', 'smart'],
    'array-callback-return': 'error',
    'max-classes-per-file': ['error', 1],
    'react-hooks/exhaustive-deps': 'error',
  },
  overrides: [
    {
      files: ['src/**/**.ts'],
      extends: [],
    },
  ],
}
