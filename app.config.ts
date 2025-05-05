
import { defineConfig } from '@solidjs/start/config'
import { resolveAlias } from './.ace/fundamentals/resolveAlias'


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
