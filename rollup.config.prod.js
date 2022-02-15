/* eslint-disable import/no-extraneous-dependencies */
import browsersync from 'rollup-plugin-browsersync';
import copy from 'rollup-plugin-copy';
import commonjs from 'rollup-plugin-commonjs';
import html from 'rollup-plugin-html-scaffold';
import resolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import progress from 'rollup-plugin-progress';
import replace from 'rollup-plugin-replace';
import { string } from 'rollup-plugin-string';
import url from 'postcss-url';
import { version } from './package.json';

const appBundle = `app.es5.${version}.${new Date().getTime()}.js`;

export default [
  {
    input: ['src/index.js'],
    output: {
      file: `dist/${appBundle}`,
      format: 'umd',
      sourcemap: true,
    },
    plugins: [
      progress(),
      html({
        input: 'public/index.html',
        output: 'index.html',
        template: { appBundle },
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('development'),
      }),
      string({ include: '**/*.html' }),
      postcss({
        extensions: ['.css', '.sss', '.pcss', '.scss'],
        plugins: [url({ url: 'inline' })],
      }),
      resolve(),
      commonjs(),
      copy({
        targets: {
          'public/assets': 'dist/assets',
          'public/favicon.ico': 'dist/favicon.ico',
        },
      }),,
    ],
  },
];
