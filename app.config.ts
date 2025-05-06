
import { resolveAlias } from './.ace/resolveAlias'
import { defineConfig } from '@solidjs/start/config'


export default defineConfig({
  middleware: './src/lib/middleware.ts',
  vite({ router }) {
    return {
      resolve: {
        alias: resolveAlias(router, import.meta.url)
      }
    }
  }
})
