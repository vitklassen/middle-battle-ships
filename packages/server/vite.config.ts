import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    ssr: true,
    outDir: 'dist',
    rollupOptions: {
      input: resolve(__dirname, 'index.ts'),
      external: ['node:fs', 'node:path', 'node:url'],
    },
  },
  ssr: {
    target: 'node',
    noExternal: ['**'],
  },
  resolve: {
    alias: {
      '@components': resolve(__dirname, '../client/components'),
    },
  },
});
