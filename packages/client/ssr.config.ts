import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import path, { resolve } from 'path';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  ssr: {
    target: 'node',
    noExternal: ['**'],
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  build: {
    outDir: 'ssr-dist',
    ssr: true,
    emptyOutDir: true,
    lib: {
      entry: path.resolve(__dirname, 'ssr.tsx'),
      name: 'ssr',
      formats: ['cjs'],
    },
    rollupOptions: {
      input: path.resolve(__dirname, 'ssr.tsx'),
      output: {
        format: 'cjs',
        entryFileNames: 'ssr.cjs',
        chunkFileNames: '[name]-[hash].cjs',
        assetFileNames: 'assets/[name]-[hash][extname]',
        hoistTransitiveImports: false,
      },
      external: ['node:fs', 'node:path', 'node:url'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
