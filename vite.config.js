import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(async () => {
  // Dynamically import the tailwind plugin
  const tailwindcss = await import('@tailwindcss/vite').then(m => m.default || m);
  
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env': JSON.stringify({}),
      'process': JSON.stringify({}),
      global: 'globalThis'
    },
    build: {
      outDir: 'dist',
      lib: {
        entry: path.resolve(__dirname, 'src/react/index.jsx'),
        name: 'HeroiconsWidget',
        fileName: 'widget',
        formats: ['umd', 'es']
      },
      rollupOptions: {
        // Make sure to externalize React so it's not included in the bundle
        external: ['react', 'react-dom'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM'
          }
        }
      }
    }
  }
})
