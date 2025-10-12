import './Unknown.css'
import { A } from '@ace/a'
import { Title } from '@solidjs/meta'
import { Route404 } from '@ace/route404'
import RootLayout from '@src/app/RootLayout'


export default new Route404()
  .layouts([RootLayout])
  .component(({location}) => {
    return <>
      <Title>😅 404</Title>

      <main class="not-found">
        <div class="code">404 😅</div>
        <div class="message">We don't have a page called:</div>
        <div class="path">{location.pathname}</div>
        <A path="/" $a={{class: 'brand'}}>🏡 Go Back Home</A>
      </main>
    </>
  })
