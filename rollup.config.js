import svelte from 'rollup-plugin-svelte'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'
import css from 'rollup-plugin-css-only'
import copy from 'rollup-plugin-copy'
import { minify } from 'html-minifier-terser'

const pkg = require('./package.json')
const production = process.env.NODE_ENV === 'production'

const defaultOptions = {
  removeComments: true,
  removeCommentsFromCDATA: true,
  removeCDATASectionsFromCDATA: true,
  collapseWhitespace: true,
  collapseBooleanAttributes: true,
  removeAttributeQuotes: true,
  removeRedundantAttributes: true,
  useShortDoctype: true,
  removeEmptyAttributes: true,
  removeEmptyElements: false,
  removeOptionalTags: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  minifyJS: true,
  minifyCSS: true,
}

function serve() {
  let server

  function toExit() {
    if (server) server.kill(0)
  }

  return {
    writeBundle() {
      if (server) return
      server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
        stdio: ['ignore', 'inherit', 'inherit'],
        shell: true,
      })

      process.on('SIGTERM', toExit)
      process.on('exit', toExit)
    },
  }
}

export default {
  input: 'src/main.js',
  output: {
    sourcemap: !production,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js',
  },
  plugins: [
    svelte({
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production,
      },
    }),
    // we'll extract any component CSS out into
    // a separate file - better for performance
    css({ output: 'bundle.css' }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ['svelte'],
    }),
    commonjs(),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload('public'),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
    production && copy({
      targets: [
        {
          src: ['public/sw.js', 'public/index.html', 'public/global.css', 'public/manifest.json'],
          dest: 'public/',
          transform: async (contents, fileName) => {
            let contentString = contents.toString()
            if (['index.html', 'global.css', 'manifest.json'].includes(fileName)) {
              contentString = await minify(contentString, defaultOptions)
            }
            return contentString.replace(/{{appVersion}}/g, pkg.version)
          },
        },
      ],
    }),
  ],
  watch: {
    clearScreen: false,
  },
}
