module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      'node': {
        'extensions': ['.js', '.mjs', '.cjs'],
      }
    },
  },
  rules: {
    'import/extensions': ['error', 'always', {
      js: 'never',
      mjs: 'always',
    }],
    'no-console': 'off',
    'prettier/prettier': ['error'],
    'no-underscore-dangle': 'off',
  },
};
