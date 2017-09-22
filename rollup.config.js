import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import image from 'rollup-plugin-image';
import json from 'rollup-plugin-json';
import filesize from 'rollup-plugin-filesize';
import replace from 'rollup-plugin-replace';
import postcss from 'rollup-plugin-postcss';
import cssnext from 'postcss-cssnext';
import cssnano from 'cssnano';
import cssmodules from 'postcss-modules';

const isProd = process.env.NODE_ENV === 'production';
const cssExportMap = {};

export default {
  input: 'src/main.jsx',
  output: {
    file: 'dist/main.js',
    format: 'iife',
    sourcemap: true,
  },
  context: 'window',
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify( process.env.NODE_ENV ),
    }),
    image({
    }),
    resolve({
      jsnext: true,
      extensions: [ '.js', '.jsx', '.json' ],
    }),
    postcss({
      browsers: 'last 3 versions',
      plugins: [
        cssmodules({
          getJSON(id, exportTokens) {
            cssExportMap[ id ] = exportTokens;
          },
        }),
        cssnext(),
        ( isProd && cssnano({ autoprefixer: false }) ),
      ].filter(Boolean),
      getExportNamed: false,
      getExport: id => cssExportMap[ id ],
      sourceMap: true,
      extract: true,
      extensions: [ '.css' ],
    }),
    commonjs({
      include: [
        'node_modules/**'
      ],
      namedExports: {
        'node_modules/react/react.js': [ 'Children', 'Component', 'PropTypes', 'createElement' ],
        'node_modules/react-dom/index.js': [ 'render' ],
      }
    }),
    json(),
    eslint({
      configFile: 'eslint-config-webdeveric',
      include: 'src/**/*.js'
    }),
    babel(),
    ( isProd && uglify() ),
    filesize(),
  ],
  watch: {
    exclude: ['node_modules/**'],
  }
};
