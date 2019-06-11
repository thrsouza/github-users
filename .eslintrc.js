module.exports = {
  extends: ['@open-wc/eslint-config', 'eslint-config-prettier'].map(require.resolve),
  rules: {
    'no-param-reassign': 0,
    'class-methods-use-this': 0,
    'no-nested-ternary': ['warn'],
    'prefer-destructuring': ['warn'],
    eqeqeq: ['warn'],
    indent: ['error', 2, { SwitchCase: 1 }],
  },
};
