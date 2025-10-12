// @refresh reload
import { createHandler, StartServer } from '@solidjs/start/server'

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <link href="/agGrid.css" rel="stylesheet"/>
          {assets}
        </head>
        <body>
          <div id="app">{children}</div>

          <script src="https://cdn.jsdelivr.net/npm/chart.js@4.5.0/dist/chart.umd.min.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/markdown-it@14.1.0/dist/markdown-it.min.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/ag-grid-community@34.2.0/dist/ag-grid-community.min.js"></script>

          {scripts}
        </body>
      </html>
    )}
  />
))
