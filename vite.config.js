import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    base: '/dv1677-ht26-grupp2-frontend',
    server: {
      port: 5173,
      proxy: {
        '/api': {
        target: env.DEV_API_PROXY || 'http://localhost:3000',
        changeOrigin: true
        }
      }
    }
  }
});
