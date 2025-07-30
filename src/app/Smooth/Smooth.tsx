import './Smooth.css'
import { A } from '@ace/a'
import { load } from '@ace/load'
import { Route } from '@ace/route'
import { reload } from '@ace/reload'
import { Title } from '@solidjs/meta'
import { Loading } from '@ace/loading'
import { fortunes } from '@src/lib/vars'
import { apiCharacter } from '@ace/apis'
import RootLayout from '@src/app/RootLayout'
import type { Element } from '@src/lib/types'
import { Show, Suspense, type JSX } from 'solid-js'
import { svg_npm, svg_github } from '@src/lib/svgs'
import type { APIName2LoadResponse } from '@ace/types'
import { randomArrayItem } from '@ace/randomArrayItem'
import type { ScopeComponent } from '@ace/scopeComponent'
import { showToast, toastStyleDark, toastStyleLight, type ShowToastProps } from '@ace/toast'


export default new Route('/smooth')
  .layouts([RootLayout])
  .component((scope) => {
    const air = load(() => apiCharacter({pathParams: {element: 'air'}}), '💨')
    const fire = load(() => apiCharacter({pathParams: {element: 'fire'}}), '🔥')
    const earth = load(() => apiCharacter({pathParams: {element: 'earth'}}), '🌎')
    const water = load(() => apiCharacter({pathParams: {element: 'water'}}), '💦')

    return <>
      <Title>😎 Smooth</Title>

      <main class="smooth">
        <div class="emoji">💫</div>
        <Notice />
        <Characters res={{ air, fire, earth, water }} />
        <div class="hr"></div>
        <Links scope={scope}/>
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


function Links({scope}: {scope: ScopeComponent}) {
  return <>
    <div class="links">
      <button onClick={() => reload('🔁', ['💨', '🔥', '🌎', '💦'])} disabled={scope.bits.isOn('🔁')} class="brand" type="button">
        <Show when={scope.bits.isOn('🔁')} fallback="🔁 Reload">
          <Loading type="two" color="white" twoColor="var(--link-color)" />
        </Show>
      </button>

      <button onClick={() => showToast(getToastProps())} class="brand">📣 Show Toast Notifications</button>

      <a href="https://github.com/orgs/acets-team/repositories" target="_blank" class="brand">
        {svg_github()}
        <span>GitHub</span>
      </a>

      <a href="https://www.npmjs.com/package/@acets-team/ace" target="_blank" class="brand">
        {svg_npm()}
        <span>NPM</span>
      </a>


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


function getToastProps(): ShowToastProps {
  return {
    type: randomArrayItem(types),
    value: randomArrayItem(fortunes),
    toastProps: {
      style: randomArrayItem(styles),
    }
  }
}

const types: ShowToastProps['type'][] = ['info', 'success']

const styles: JSX.CSSProperties[] = [toastStyleDark, toastStyleLight]
