// @refresh reload
import { createHandler, StartServer } from '@solidjs/start/server'

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
          <link href="/.ace/sw.styles.css" rel="stylesheet" />

          <meta name="description" content="Create Ace App is a showcase for what is possible w/ Ace!" />

          {/* disables manual user zooming */}
          <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />

          {/* enhance how the site looks when added to an iOS device's home screen */}
          <meta name="apple-mobile-web-app-capable" content="yes" /> {/* tells iOS Safari that the web application should be run in full-screen mode without the standard browser chrome (address bar, toolbar) when launched from a home screen icon */}
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" /> {/* sets the appearance of the iOS status bar (time, battery icons) when running in full-screen mode */}

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
