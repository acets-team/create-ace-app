import './Fortunes.css'
import { Route } from '@ace/route'
import { Submit } from '@ace/submit'
import { For, Show } from 'solid-js'
import { Title } from '@solidjs/meta'
import { showToast } from '@ace/toast'
import { Refresh } from '@src/lib/Refresh'
import { apiGetFortune } from '@ace/apis'
import { SmoothFor } from '@ace/smoothFor'
import { useStore } from '@src/store/store'
import RootLayout from '@src/app/RootLayout'
import { createOnSubmit } from '@ace/createOnSubmit'


export default new Route('/fortunes')
  .layouts([RootLayout])
  .component(() => {  
    const {set, sync, store} = useStore()

    const smoothFor = new SmoothFor({ parent: '#smooth-fortunes', children: '.fortune' })

    const onFortuneButtonClick = createOnSubmit(() => {
      apiGetFortune({
        onData (d) {
          smoothFor.preSync()
          sync('fortunes', [d, ...store.fortunes])
          smoothFor.postSync()
        }
      })
    })

    const onResetClick = () => {
      set('fortunes', [])
      showToast({ type: 'success', value: 'Success!' })
    }

    return <>
      <Title>🧚‍♀️ Fortunes</Title>

      <main class="fortunes">
        <div class="emoji">✨</div>
        <div class="page-title">Fortunes 🧚‍♀️</div>

        <div class="buttons">
          <form onSubmit={onFortuneButtonClick}>
            <Submit label="Click for Fortunes!" bitKey="apiGetFortune" $button={{class: 'brand gold'}} $Loading={{type: 'two'}} />
          </form>

          <Show when={store.fortunes.length}>
            <Refresh onClick={onResetClick} tooltipContent="Refresh Fortunes" position="topLeft" />
          </Show>
        </div>

        <div id="smooth-fortunes">
          <For each={store.fortunes}>{
            (item) => <div class="fortune" ref={smoothFor.ref()}>{item.text}</div>
          }</For>
        </div>
      </main>
    </>
  })
