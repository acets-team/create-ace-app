// @refresh reload
import swRegister from '@ace/swRegister?raw'
import swStyles from '@ace/sw.styles.css?raw'
import { createHandler, StartServer } from '@solidjs/start/server'

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <style>{swStyles}</style>
          <link rel="icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content="Create Ace App is a showcase for what is possible w/ Ace!" />

          {/* enhance how the site looks when added to an iOS device's home screen */}
          <meta name="apple-mobile-web-app-capable" content="yes" /> {/* tells iOS Safari that the web application should be run in full-screen mode without the standard browser chrome (address bar, toolbar) when launched from a home screen icon */}
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" /> {/* sets the appearance of the iOS status bar (time, battery icons) when running in full-screen mode */}

          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          <script>{swRegister}</script>
          {scripts}
        </body>
      </html>
    )}
  />
))
