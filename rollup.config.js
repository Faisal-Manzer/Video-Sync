import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import {terser} from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy';
import progress from 'rollup-plugin-progress';
import postcss from 'rollup-plugin-postcss';
import serve from 'rollup-plugin-serve';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/bundle.js',
        format: 'iife',
        sourcemap: !production
    },
    plugins: [
        progress(),
        copy({
            targets: [{src: 'src/public/*', dest: 'dist'}],
            copyOnce: true
        }),
        postcss(),
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
