import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { copyFileSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ['src'],
      rollupTypes: true,
    }),
    {
      name: 'copy-tokens-css',
      closeBundle() {
        // Copy tokens.css to dist for direct import
        copyFileSync(
          resolve(__dirname, 'src/tokens/tokens.css'),
          resolve(__dirname, 'dist/tokens.css')
        );
      },
    },
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SyndigoDesignSystem',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        assetFileNames: (assetInfo) => {
          // Keep CSS filename as style.css
          if (assetInfo.name === 'style.css') {
            return 'style.css';
          }
          return assetInfo.name || 'asset';
        },
      },
    },
    cssCodeSplit: false,
  },
});
