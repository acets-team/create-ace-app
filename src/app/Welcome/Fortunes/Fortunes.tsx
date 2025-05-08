import './Fortunes.css'
import '@ace/loadSpin.styles'
import { Route } from '@ace/route'
import { Title } from '@solidjs/meta'
import RootLayout from '../../RootLayout'
import WelcomeLayout from '../WelcomeLayout'
import { createSignal, For, Show } from 'solid-js'
import { fortunes as allFortunes } from '@src/lib/vars'
import { randomBetween } from '@ace/randomBetween'
import { AnimatedFor, ForAnimator } from '@ace/animatedFor'


export default new Route('/fortunes')
  .layouts([RootLayout, WelcomeLayout])
  .component((fe) => {  
    const forAnimator = new ForAnimator()
    const [fortunes, setFortunes] = createSignal<{fortune: string}[]>([])

    async function onClick() {
      forAnimator.preFetch()

      const params = { id: randomBetween(0, allFortunes.length - 1) } 

      const res = await fe.GET('/api/fortune/:id', {params, bitKey: 'fortune'}) // call BE api

      if (res.error) alert(res.error.message)

      if (res.data) {
        setFortunes([ res.data, ...fortunes() ]) // bind to beginning
        forAnimator.postSet()
      }
    }

    return <>
      <Title>🧚‍♀️ Fortunes</Title>

      <main class="fortunes">
        <div class="title">Fortunes 🧚‍♀️</div>

        <button onClick={onClick} disabled={fe.bits.isOn('fortune')} class="brand gold">
          <Show when={fe.bits.isOn('fortune')} fallback="Click for Fortunes!">
            <span class="load-spin--two"></span>
          </Show>
        </button>

        <AnimatedFor forAnimator={forAnimator} items={
          <For each={fortunes()}>
            {({fortune}) => <div class="fortune">{fortune}</div>}
          </For>
        } />
      </main>
    </>
  })
