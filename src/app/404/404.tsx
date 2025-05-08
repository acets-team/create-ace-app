import './404.css'
import { A } from '@ace/a'
import { Title } from '@solidjs/meta'
import RootLayout from '../RootLayout'
import { Route404 } from '@ace/route404'


export default new Route404()
  .layouts([RootLayout])
  .component((fe) => {
    return <>
      <Title>😅 404</Title>

      <main class="not-found">
        <div class="code">404 😅</div>
        <div class="message">We don't have a page called:</div>
        <div class="path">{fe.getLocation().pathname}</div>
        <A path="/" class="brand">🏡 Go Back Home</A>
      </main>
    </>
  })
