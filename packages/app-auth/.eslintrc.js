module.exports = {
  extends: require.resolve('@umijs/max/eslint'),
  globals: {
    AUTH_APP_ENV: true,
  },
  rules: {
    'no-unused-vars': [1],
    '@typescript-eslint/no-unused-vars': [1], // warn
    '@typescript-eslint/no-empty-interface': [0],
  },
};
