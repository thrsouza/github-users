module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        exclude: [
          '@babel/plugin-transform-regenerator',
          '@babel/plugin-transform-async-to-generator',
        ],
      },
    ],
  ],
  plugins: [['module:fast-async', { compiler: { noRuntime: true } }]],
};
