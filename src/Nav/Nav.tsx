import './Nav.css'
import { Show } from 'solid-js'
import { Refresh } from '@src/lib/Refresh'
import { Tabs, RouteTab } from '@ace/tabs'
import { Counter } from '@src/lib/Counter'
import { useStore } from '@src/store/store'


export function Nav (props?: {showRefresh?: boolean}) {
  const {set} = useStore()

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
        <Refresh onClick={() => set('count', 0)} tooltipContent="Refresh Count" />
      </Show>
    </nav>
  </>
}
