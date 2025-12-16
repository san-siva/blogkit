import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import url from 'rollup-plugin-url';

// Plugin to preserve 'use client' directives
function preserveDirectives() {
  const fileDirectives = new Map();

  return {
    name: 'preserve-directives',

    transform(code, id) {
      // Track which files have 'use client'
      if (id.endsWith('.tsx') || id.endsWith('.ts')) {
        if (code.trim().startsWith("'use client'") || code.trim().startsWith('"use client"')) {
          fileDirectives.set(id, "'use client';");
        }
      }
      return null;
    },

    renderChunk(code, chunk) {
      // Check if any module in this chunk needs 'use client'
      for (const moduleId of Object.keys(chunk.modules)) {
        if (fileDirectives.has(moduleId)) {
          return {
            code: `'use client';\n${code}`,
            map: null,
          };
        }
      }
      return null;
    },
  };
}

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: 'dist/cjs',
      format: 'cjs',
      sourcemap: true,
      preserveModules: true,
      preserveModulesRoot: 'src',
      exports: 'named',
    },
    {
      dir: 'dist/esm',
      format: 'esm',
      sourcemap: true,
      preserveModules: true,
      preserveModulesRoot: 'src',
    },
  ],
  plugins: [
    peerDepsExternal(),
    preserveDirectives(),
    json(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.build.json',
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
