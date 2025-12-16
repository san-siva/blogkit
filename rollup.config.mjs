import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import url from 'rollup-plugin-url';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
      inlineDynamicImports: true,
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
      inlineDynamicImports: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    json(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      exclude: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
    }),
    postcss({
      modules: true,
      extract: false,
      minimize: true,
      sourceMap: true,
      use: [
        [
          'sass',
          {
            includePaths: ['node_modules', 'node_modules/@san-siva/stylekit'],
          },
        ],
      ],
    }),
    url({
      include: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.gif'],
      limit: 8192, // Inline files smaller than 8kb
      emitFiles: true,
    }),
  ],
  external: ['react', 'react-dom', 'next', '@react-spring/web', 'mermaid', 'prismjs', 'react-syntax-highlighter'],
};
