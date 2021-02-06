import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import {babel} from '@rollup/plugin-babel';
import {terser} from 'rollup-plugin-terser';
import progress from 'rollup-plugin-progress';
import postcss from 'rollup-plugin-postcss';
import serve from 'rollup-plugin-serve';
import htmlTemplate from 'rollup-plugin-generate-html-template';
import cleaner from 'rollup-plugin-cleaner';
import * as path from 'path';


const production = process.env.NODE_ENV === 'production';

export default {
    input: 'src/index.js',
    output: {
        file: production? `dist/bundle.${+new Date()}.js` : 'dist/bundle.js',
        format: 'cjs',
        sourcemap: !production
    },
    plugins: [
        {
            name: 'watch-external',
            buildStart() {
                this.addWatchFile(path.resolve(__dirname, 'src/template.html'))
            }
        },
        progress(),
        cleaner({
            targets: ['dist']
        }),
        htmlTemplate({
            template: 'src/template.html',
            target: 'dist/index.html',
        }),
        commonjs(),
        babel({
            babelHelpers: 'bundled',
            presets: ['@babel/env'],
            plugins: []
        }),
        postcss({
            extract: production,
            minimize: production
        }),
        resolve(),
        production && terser(), // minify, but only in production
        !production && serve({
            open: true,
            contentBase: 'dist',
            port: 8000
        })
    ]
};
