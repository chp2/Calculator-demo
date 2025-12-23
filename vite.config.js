import { defineConfig } from 'vite';

export default defineConfig({
  base: '/Calculator-demo/',
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'math': ['mathjs', 'decimal.js']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
