import './Smooth.css'
import { A } from '@ace/a'
import '@ace/shimmer.styles.css'
import { load } from '@ace/load'
import { Route } from '@ace/route'
import { Suspense } from 'solid-js'
import { Title } from '@solidjs/meta'
import RootLayout from '../RootLayout'
import { apiCharacter } from '@ace/apis'
import type { InferLoadFn } from '@ace/types'
import type { elementEnums } from '@src/lib/vars'
import type { InferEnums } from '@ace/paramEnums'
import { svg_npm, svg_github } from '@src/lib/svgs'


export default new Route('/smooth')
  .layouts([RootLayout])
  .component(() => {
    const air = load(() => apiCharacter({params: {element: 'air'}}), 'air')
    const fire = load(() => apiCharacter({params: {element: 'fire'}}), 'fire')
    const earth = load(() => apiCharacter({params: {element: 'earth'}}), 'earth')
    const water = load(() => apiCharacter({params: {element: 'water'}}), 'water')

    return <>
      <Title>😎 Smooth</Title>

      <main class="smooth">
        <div class="welcome-emoji">🌟</div>
        <Notice />
        <Characters res={{ air, fire, earth, water }} />
        <div class="hr"></div>
        <Links />
      </main>
    </>
  })


function Notice() {
  return <>
    <div class="title">Smooth 😎</div>

    <ol>
      <li>Did ya notice on page load... 🧐</li>
      <li>Static content is available immediately! 💨</li>
      <li>& each response is streamed when ready?! 🪄</li>
    </ol>
  </>
}


function Characters({ res }: { res: Record<InferEnums<typeof elementEnums>, InferLoadFn<'apiCharacter'>> }) {
  return <>
    <div class="characters">
      <Character element={res.fire} />
      <Character element={res.water} />
      <Character element={res.earth} />
      <Character element={res.air} />
    </div>
  </>
}


function Character({ element }: { element: InferLoadFn<'apiCharacter'> }) {
  return <>
    <div class="character">
      <Suspense fallback={<div class="ace-shimmer"></div>}>
        {element()?.error?.message || element()?.data?.character}
      </Suspense>
    </div>
  </>
}


function Links() {
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

      <A path="/" activeClass="active" end={true} class="brand">
        <span>🏡</span>
        <span>Home</span>
      </A>

      <A path="/fortunes" activeClass="active" class="brand">
        <span>🧚‍♀️</span>
        <span>Fortunes</span>
      </A>

      <A path="/smooth" activeClass="active" class="brand">
        <span>😎</span>
        <span>Smooth</span>
      </A>
    </div>
  </>
}
