import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDevelopment = mode === 'development';

  return {
    base: '/',

    plugins: [react()],

    css: {
      modules: {
        localsConvention: 'camelCase',
      },
    },

    build: {
      outDir: './dist',
      emptyOutDir: true,
      assetsDir: 'assets',
      rollupOptions: {
        input: {
          main: './index.html',
        },
        output: {
          assetFileNames: 'assets/[name]-[hash][extname]',
        },
      },
    },

    // ТОЛЬКО В DEVELOPMENT
    ...(isDevelopment && {
      server: {
        port: 3000,
        host: '0.0.0.0',
        proxy: {
          '/api': {
            target: 'http://server:3001',
            changeOrigin: true,
          },
        },
      },
    }),

    define: {
      __SERVER_PORT__: 3001,
    },
  };
});
