import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { sentryVitePlugin } from '@sentry/vite-plugin'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    build: {
      sourcemap: true,
    },
    plugins: [
      react(),
      svgr({ svgrOptions: {} }),
      sentryVitePlugin({
        org: 'value-at-void',
        project: 'geode-client',
        authToken: env.SENTRY_AUTH_TOKEN,
        telemetry: false,
      }),
    ],
  }
})
