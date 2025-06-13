import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(async () => {
  // Dynamically import the tailwind plugin
  const tailwindcss = await import('@tailwindcss/vite').then(m => m.default || m);
  
  return {
    plugins: [
      react({
        // Optimize React for production
        babel: {
          compact: true,
          minified: true
        }
      }), 
      tailwindcss()
    ],
    define: {
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env': JSON.stringify({}),
      'process': JSON.stringify({}),
      global: 'globalThis'
    },
    build: {
      outDir: 'dist',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn']
        }
      },
      lib: {
        entry: path.resolve(__dirname, 'src/react/index.jsx'),
        name: 'HeroiconsWidget',
        fileName: 'widget',
        formats: ['umd', 'es']
      },
      rollupOptions: {
        // Externalize React dependencies only
        external: ['react', 'react-dom'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM'
          }
        }
      },
      // Enable tree shaking
      treeshake: {
        preset: 'recommended',
        moduleSideEffects: false
      }
    }
  }
})
