import './Nav.css'
import { Tabs, RouteTab } from '@ace/tabs'
import { Counter } from '@src/lib/Counter'


export function Nav () {
  return <>
    <nav>
      <Counter />

      <Tabs
        mode="route"
        variant="pill"
        tabs={[
          new RouteTab('Home', '/'),
          new RouteTab('Fortunes', '/fortunes'),
          new RouteTab('Smooth', '/smooth'),
        ]}
      />
    </nav>
  </>
}
