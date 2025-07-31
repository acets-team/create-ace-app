
import { resolveAlias } from './.ace/resolveAlias'
import { defineConfig } from '@solidjs/start/config'


export default defineConfig({
  vite() {
    return {
      resolve: {
        alias: resolveAlias(import.meta.url)
      }
    }
  }
})
