import './Smooth.css'
import { A } from '@ace/a'
import { load } from '@ace/load'
import { Route } from '@ace/route'
import { Title } from '@solidjs/meta'
import { fortunes } from '@src/lib/vars'
import { apiCharacter } from '@ace/apis'
import type { Element } from '@src/lib/vars'
import RootLayout from '@src/app/RootLayout'
import { Suspense, type JSX } from 'solid-js'
import { randomBetween } from '@ace/randomBetween'
import { svg_npm, svg_github } from '@src/lib/svgs'
import type { APIName2LoadResponse } from '@ace/types'
import { showToast, toastStyleDark, toastStyleLight, type ShowToastProps } from '@ace/toast'


export default new Route('/smooth')
  .layouts([RootLayout])
  .component(() => {
    const air = load(() => apiCharacter({pathParams: {element: 'air'}}), 'air')
    const fire = load(() => apiCharacter({pathParams: {element: 'fire'}}), 'fire')
    const earth = load(() => apiCharacter({pathParams: {element: 'earth'}}), 'earth')
    const water = load(() => apiCharacter({pathParams: {element: 'water'}}), 'water')

    return <>
      <Title>😎 Smooth</Title>

      <main class="smooth">
        <div class="emoji">💫</div>
        <Notice />
        <Characters res={{ air, fire, earth, water }} />
        <div class="hr"></div>
        <Links />
      </main>
    </>
  })


function Notice() {
  return <>
    <div class="page-title">Smooth 😎</div>

    <ol>
      <li>Did ya notice on page load... 🧐</li>
      <li>Static content is available immediately! 💨</li>
      <li>& each response is streamed when ready?! 🪄</li>
    </ol>
  </>
}


function Characters({ res }: { res: Record<Element, APIName2LoadResponse<'apiCharacter'>> }) {
  return <>
    <div class="characters">
      <Character element={res.fire} />
      <Character element={res.water} />
      <Character element={res.earth} />
      <Character element={res.air} />
    </div>
  </>
}


function Character({ element }: { element: APIName2LoadResponse<'apiCharacter'> }) {
  return <>
    <div class="character">
      <Suspense fallback={<div class="ace-shimmer"></div>}>
        {element()?.error?.message || element()?.data}
      </Suspense>
    </div>
  </>
}


function Links() {
  const types: ShowToastProps['type'][] = ['info', 'success']
  const styles: JSX.CSSProperties[] = [toastStyleDark, toastStyleLight]

  function getToastProps(): ShowToastProps {
    return {
      type: types[randomBetween(0, types.length - 1)],
      value: fortunes[randomBetween(0, fortunes.length - 1)],
      toastProps: {
        style: styles[randomBetween(0, styles.length - 1)]
      }
    }
  }

  return <>
    <div class="links">
      <a href="https://github.com/orgs/acets-team/repositories" target="_blank" class="brand">
        {svg_github()}
        <span>GitHub</span>
      </a>

      <a href="https://www.npmjs.com/package/@acets-team/ace" target="_blank" class="brand">
        {svg_npm()}
        <span>NPM</span>
      </a>

      <button onClick={() => showToast(getToastProps())} class="brand">📣 Show Toast Notifications</button>

      <A path="/" solidAProps={{ class: 'brand', end: true }}>
        <span>🏡</span>
        <span>Home</span>
      </A>

      <A path="/fortunes" solidAProps={{ class: 'brand' }}>
        <span>🧚‍♀️</span>
        <span>Fortunes</span>
      </A>

      <A path="/smooth" solidAProps={{ class: 'brand' }}>
        <span>😎</span>
        <span>Smooth</span>
      </A>
    </div>
  </>
}
