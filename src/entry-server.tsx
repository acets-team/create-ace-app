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
          <meta name="description" content="Create Ace App is a showcase for what is possible w/ Ace!" />
          <link href="/.ace/sw.styles.css" rel="stylesheet" />
          <link rel="manifest" href="/manifest.json" />
          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          <script src="/.ace/swRegister.js"></script>
          {scripts}
        </body>
      </html>
    )}
  />
))
