module.exports = {
  extends: require.resolve('@umijs/lint/dist/config/eslint'),
  rules: {
    '@typescript-eslint/no-unused-vars': [1], // warn
    '@typescript-eslint/no-empty-interface': [0],
  },
};
