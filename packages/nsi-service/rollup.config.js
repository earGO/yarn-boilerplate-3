import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import resolve from 'rollup-plugin-node-resolve'
import url from 'rollup-plugin-url'
import svgr from '@svgr/rollup'
import json from 'rollup-plugin-json'

import pkg from './package.json'

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    }
  ],

  plugins: [
    external(),
    url(),
    svgr(),
    babel({
      babelrc: false,
      runtimeHelpers: true,
      presets: [['es2015', { modules: false }], 'stage-0', 'react'],
      exclude: ['node_modules/**', '**/*.json'],
      plugins: [
        'external-helpers',
        [
          'transform-runtime',
          {
            polyfill: false,
            regenerator: true
          }
        ]
      ]
    }),
    resolve(),
    commonjs(),
    json()
  ]
}
