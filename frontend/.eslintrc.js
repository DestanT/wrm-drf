module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier', 'import'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
  rules: {
    'prettier/prettier': 'warn',
    'import/no-unresolved': 'error',
  },
};
