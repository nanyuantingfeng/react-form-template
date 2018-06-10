import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',

  output: [
    {
      file: 'lib/index.js',
      format: 'umd',       //'amd', 'cjs', 'system', 'esm', 'iife' or 'umd'
      name: 'ReactFormTemplate'
    },
  ],

  external: [
    'react',
    'react-dom',
    'prop-types',
  ],

  plugins: [

    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),

    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [
        ['env', {modules: false}],
        'react',
      ],
      plugins: [
        'external-helpers',
        'add-module-exports',
        'syntax-export-extensions',
        'syntax-dynamic-import',
        'transform-object-rest-spread',
        'transform-runtime',
        'transform-regenerator',
        'transform-decorators-legacy',
        'transform-class-properties',
      ],
      runtimeHelpers: true,
    }),

    resolve({
      modulesOnly: true,
      module: true,
      jsnext: true,
      main: true,
    }),

    commonjs(),
  ]
};
