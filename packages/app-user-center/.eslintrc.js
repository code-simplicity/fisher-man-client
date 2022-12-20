module.exports = {
  extends: require.resolve('@umijs/max/eslint'),
  rules: {
    'no-unused-vars': [1],
    '@typescript-eslint/no-unused-vars': [1], // warn
    '@typescript-eslint/no-empty-interface': [0],
  },
};
