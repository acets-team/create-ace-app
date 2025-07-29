
import { resolveAlias } from './.ace/resolveAlias'
import { defineConfig } from '@solidjs/start/config'


export default defineConfig({
  middleware: './src/lib/middleware.ts',
  vite() {
    return {
      resolve: {
        alias: resolveAlias(import.meta.url)
      }
    }
  }
})
