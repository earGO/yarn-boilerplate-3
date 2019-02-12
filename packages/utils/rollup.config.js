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
      sourcemap: true,
    },
  ],
  plugins: [
    external(),
    url(),
    svgr(),
    babel({
      babelrc: false,
      runtimeHelpers: true,
      presets: [['@babel/env', { modules: false }], '@babel/react'],
      exclude: ['node_modules/**', '**/*.json'],
      plugins: [
        '@babel/external-helpers',
        [
          '@babel/transform-runtime',
          {
            regenerator: true,
          },
        ],
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-export-default-from',
      ],
    }),
    resolve(),
    commonjs({
      include: ['node_modules/**', 'node_modules/create-react-class/**'],
      // exclude: ['node_modules/process-es6/**'],
      // namedExports: {
      //   'node_modules/react-is/index.js': ['isElement', 'isValidElementType', 'ForwardRef'],
      //   'node_modules/react/index.js': [
      //     'Children',
      //     'Component',
      //     'PureComponent',
      //     'PropTypes',
      //     'createElement',
      //     'Fragment',
      //     'cloneElement',
      //     'StrictMode',
      //     'createFactory',
      //     'createRef',
      //     'createContext',
      //     'isValidElement',
      //     'isValidElementType',
      //   ],
      //   'node_modules/react-dom/index.js': ['render', 'hydrate'],
      // },
    }),
    json(),
  ],
}
