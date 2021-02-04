import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import {terser} from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy';
import progress from 'rollup-plugin-progress';
import postcss from 'rollup-plugin-postcss';
import serve from 'rollup-plugin-serve';
import * as path from "path";


const production = process.env.NODE_ENV === 'production';

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/bundle.js',
        format: 'iife',
        sourcemap: !production
    },
    plugins: [
        {
            name: 'watch-external',
            buildStart() {
                this.addWatchFile(path.resolve(__dirname, 'src/public'))
            }
        },

        progress(),
        copy({
            targets: [{src: 'src/public/*', dest: 'dist'}],
            verbose: true
        }),
        postcss({
            extract: production,
            minimize: production
        }),
        resolve(),
        commonjs(),
        production && terser(), // minify, but only in production
        !production && serve({
            open: true,
            contentBase: 'dist',
            port: 8000
        })
    ]
};
