import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Vite configuration — Section 6.4 (Bundling and Optimization)
 *
 * Production optimizations:
 *  - Manual chunk splitting: vendor (react/dom) + confetti separated
 *    from app code for better long-term caching
 *  - Terser minification with console removal in prod
 *  - Asset inlining threshold: small SVG/images inlined as base64
 *  - Source maps disabled in production (reduces bundle size)
 */
export default defineConfig(({ mode }) => ({
  plugins: [react()],

  server: {
    port: 5173,
    open: true,
  },

  build: {
    // Use Terser for better compression
    minify: 'terser',
    terserOptions: {
      compress: {
        // Remove console.* calls in production
        drop_console: mode === 'production',
        drop_debugger: true,
        passes: 2,
      },
    },

    // Chunk splitting for optimal long-term caching
    rollupOptions: {
      output: {
        manualChunks: {
          // React + ReactDOM in a single vendor chunk
          'vendor-react': ['react', 'react-dom'],
          // canvas-confetti in its own chunk (loaded on win)
          'vendor-confetti': ['canvas-confetti'],
        },
        // Content-hash filenames for cache busting
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },

    // Inline assets smaller than 4KB as base64
    assetsInlineLimit: 4096,

    // Report bundle size warnings at 500KB
    chunkSizeWarningLimit: 500,

    // No source maps in production
    sourcemap: mode !== 'production',
  },

  // Optimize dependencies pre-bundling
  optimizeDeps: {
    include: ['react', 'react-dom', 'canvas-confetti'],
  },
}));
