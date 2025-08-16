module.exports = {
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  ignorePatterns: [
    'build',
    'node_modules'
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'max-len': ['error', 150],
    'max-params': ['error', 3],
    'linebreak-style': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'operator-linebreak': 'off',
    'class-methods-use-this': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-expressions': 'off',
    'no-shadow': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'prefer-destructuring': ['error', { 'object': true, 'array': false }],
    'no-param-reassign': 'off',
    'no-constructor-return': 'off',
    'no-restricted-syntax': 'off',
    'no-continue': 'off',
    'no-nested-ternary': 'off',
    'no-console': 'off',
    'no-new': 'off',
    'max-classes-per-file': 'off',
    'import/no-unresolved': 'off',
    'react/jsx-filename-extension': 'off'
  },
  env: {
    browser: true,
    node: true
  },
  overrides: [
    {
      files: ['*.js'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ]
};