import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { sentryVitePlugin } from '@sentry/vite-plugin'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    server: env.VITE_DEV_API_PROXY
      ? {
          proxy: {
            '/api': {
              target: env.VITE_DEV_API_PROXY,
              changeOrigin: true,
              secure: true,
              cookieDomainRewrite: '',
              configure(proxy) {
                proxy.on('proxyReq', (proxyReq) => {
                  proxyReq.setHeader('Origin', 'https://rebrand-stage-hire.atvoid.com')
                  proxyReq.setHeader('Referer', 'https://rebrand-stage-hire.atvoid.com/')
                  proxyReq.setHeader('User-Agent', 'Mozilla/5.0')
                })
                proxy.on('proxyRes', (proxyRes) => {
                  const cookies = proxyRes.headers['set-cookie']
                  if (!cookies) return
                  proxyRes.headers['set-cookie'] = cookies.map((cookie) =>
                    cookie
                      .replace(/; ?Domain=[^;]*/gi, '')
                      .replace(/; ?Secure/gi, '')
                      .replace(/; ?SameSite=None/gi, '; SameSite=Lax')
                  )
                })
              },
            },
          },
        }
      : undefined,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      sourcemap: true,
    },
    plugins: [
      react(),
      svgr({ svgrOptions: {} }),
      sentryVitePlugin({
        org: "value-at-void",
        project: "geode-client",
        authToken: env.SENTRY_AUTH_TOKEN,
        telemetry: false,
      }),
    ],
  };
});
