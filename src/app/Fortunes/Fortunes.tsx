import './Fortunes.css'
import { Route } from '@ace/route'
import { Submit } from '@ace/submit'
import { For, Show } from 'solid-js'
import { buildOrigin } from '@ace/env'
import { showToast } from '@ace/toast'
import { apiGetFortune } from '@ace/apis'
import { Refresh } from '@src/lib/Refresh'
import { SmoothFor } from '@ace/smoothFor'
import { Title, Meta } from '@solidjs/meta'
import { useStore } from '@src/store/store'
import RootLayout from '@src/app/RootLayout'
import { createOnSubmit } from '@ace/createOnSubmit'
import { useNetworkStatus } from '@ace/useNetworkStatus'


export default new Route('/fortunes')
  .layouts([RootLayout])
  .component(() => {
    const status = useNetworkStatus()
    
    const {set, sync, store} = useStore()

    const smoothFor = new SmoothFor({ parent: '#smooth-fortunes', children: '.fortune' })

    const onFortuneButtonClick = createOnSubmit(() => {
      if (status() === 'offline') return showToast({ type: 'info', value: '👷‍♀️ Please regain wifi!' })

      apiGetFortune({
        onSuccess (d) {
          smoothFor.preSync()
          sync('fortunes', [d, ...store.fortunes])
          smoothFor.postSync()
        }
      })
    })

    const onRefreshClick = () => {
      if (status() === 'offline') return showToast({ type: 'info', value: '👷‍♀️ Please regain wifi!' })
      set('fortunes', [])
      showToast({ type: 'success', value: '❤️ Clear!' })
    }

    return <>
      <Title>🧚‍♀️ Fortunes · Create Ace App</Title>
      <Meta property="og:title" content="🧚‍♀️ Fortunes · Create Ace App" />
      <Meta property="og:type" content="website" />
      <Meta property="og:url" content={buildOrigin + '/fortunes'} />
      <Meta property="og:image" content={buildOrigin + '/og/fortunes.webp'} />

      <main class="fortunes">
        <div class="emoji">✨</div>
        <div class="page-title">Fortunes 🧚‍♀️</div>

        <div class="buttons">
          <form onSubmit={onFortuneButtonClick}>
            <Submit label="Click for Fortunes!" bitKey="apiGetFortune" $button={{ class: 'brand gold' }} $Loading={{ type: 'two', color: 'white', twoColor: 'gold'}} />
          </form>

          <Show when={store.fortunes.length}>
            <Refresh onClick={onRefreshClick} tooltipContent="Refresh Fortunes" position="topLeft" />
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
