import './Fortunes.css'
import { Route } from '@ace/route'
import { Title } from '@solidjs/meta'
import { apiFortune } from '@ace/apis'
import { Loading } from '@ace/loading'
import RootLayout from '@src/app/RootLayout'
import { randomBetween } from '@ace/randomBetween'
import { createSignal, For, Show } from 'solid-js'
import { fortunes as allFortunes } from '@src/lib/vars'
import { AnimatedFor, ForAnimator } from '@ace/animatedFor'


export default new Route('/fortunes')
  .layouts([RootLayout])
  .component((fe) => {  
    const forAnimator = new ForAnimator()
    const [fortunes, setFortunes] = createSignal<string[]>([])

    async function onClick() {
      forAnimator.preFetch()

      const params = { id: randomBetween(0, allFortunes.length - 1) } 

      const res = await apiFortune({params, bitKey: 'fortune'})

      if (res.error) alert(res.error.message)

      if (res.data) {
        setFortunes([ res.data, ...fortunes() ]) // bind to beginning
        forAnimator.postSet()
      }
    }

    return <>
      <Title>🧚‍♀️ Fortunes</Title>

      <main class="fortunes">
        <div class="emoji">✨</div>
        <div class="page-title">Fortunes 🧚‍♀️</div>

        <button onClick={onClick} disabled={fe.bits.isOn('fortune')} class="brand gold" type="button">
          <Show when={fe.bits.isOn('fortune')} fallback="Click for Fortunes!">
            <Loading type="two" />
          </Show>
        </button>

        <AnimatedFor forAnimator={forAnimator} items={
          <For each={fortunes()}>
            {(fortune) => <div class="fortune">{fortune}</div>}
          </For>
        } />
      </main>
    </>
  })
