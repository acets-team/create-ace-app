// @ts-check 

/** @type {import('@acets-team/ace').AceConfig} */
export const config = {
  sw: true,
  apiDir: './src/api',
  appDir: './src/app',
  logCaughtErrors: true,
  origins: {
    prod: 'https://create-ace-app.jquery-ssr.workers.dev/',
    local: ['http://localhost:3000', 'http://localhost:3001']
  },
  plugins: {
    hljs: true,
    solid: true,
    agGrid: true,
    valibot: true,
    chartjs: true,
    markdownIt: true,
  }
}
