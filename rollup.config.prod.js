/* eslint-disable import/no-extraneous-dependencies */
import analyze from 'rollup-plugin-analyzer';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import copy from 'rollup-plugin-copy';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import html from 'rollup-plugin-html-scaffold';
import resolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import url from 'postcss-url';
import progress from 'rollup-plugin-progress';
import replace from 'rollup-plugin-replace';
import { string } from 'rollup-plugin-string';
import { version } from './package.json';

const appBundle = `app.es5.${version}.${new Date().getTime()}.js`;

export default [
  {
    input: ['src/index.js'],
    output: {
      file: `dist/${appBundle}`,
      format: 'umd',
      sourcemap: false,
    },
    plugins: [
      progress(),
      html({
        input: 'public/index.html',
        output: 'index.html',
        template: { appBundle },
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      string({ include: '**/*.html' }),
      postcss({
        extensions: ['.css', '.sss', '.pcss', '.scss'],
        plugins: [url({ url: 'inline' })],
      }),
      resolve(),
      commonjs(),
      babel(),
      uglify(),
      analyze(),
      filesize(),
      copy({
        targets: {
          'public/assets': 'dist/assets',
          'public/favicon.ico': 'dist/favicon.ico',
        },
      }),
    ],
  },
];
