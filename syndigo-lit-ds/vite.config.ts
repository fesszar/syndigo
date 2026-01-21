import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { copyFileSync, mkdirSync, existsSync } from 'fs';

export default defineConfig({
  plugins: [
    dts({
      include: ['src'],
      rollupTypes: true,
    }),
    {
      name: 'copy-tokens',
      closeBundle() {
        const distDir = resolve(__dirname, 'dist');
        if (!existsSync(distDir)) {
          mkdirSync(distDir, { recursive: true });
        }
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
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['lit', 'lit/decorators.js', 'lit/directives/style-map.js', 'lit/directives/class-map.js', 'lit/directives/if-defined.js'],
    },
  },
});
