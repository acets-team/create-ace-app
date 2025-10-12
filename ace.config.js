// @ts-check 


/** @type {import('@acets-team/ace').AceConfig} */
export const config = {
  apiDir: './src/api',
  appDir: './src/app',
  logCaughtErrors: true,
  origins: {
    local: ['http://localhost:3000', 'http://localhost:3001']
  },
  plugins: {
    solid: true,
    valibot: true,
    agGrid: true,
    markdownIt: true,
    chartjs: true,
  }
}
