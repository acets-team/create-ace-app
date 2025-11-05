import './Nav.css'
import { Show } from 'solid-js'
import { showToast } from '@ace/toast'
import { Refresh } from '@src/lib/Refresh'
import { Tabs, RouteTab } from '@ace/tabs'
import { Counter } from '@src/lib/Counter'
import { useStore } from '@src/store/store'


export function Nav (props?: {showRefresh?: boolean}) {
  const {set, store} = useStore()

  const onRefreshClick = () => {
    if (store.count) {
      set('count', 0)
      showToast({ type: 'success', value: '❤️ Clear!' })
    }
  }

  return <>
    <nav>
      <Counter />

      <Tabs
        mode="route"
        variant="pill"
        tabs={() => [
          new RouteTab('Home', '/'),
          new RouteTab('Chat', '/chat'),
          new RouteTab('Fortunes', '/fortunes'),
        ]}
      />

      <Show when={props?.showRefresh}>
        <Refresh onClick={onRefreshClick} tooltipContent="Refresh Count" />
      </Show>
    </nav>
  </>
}
