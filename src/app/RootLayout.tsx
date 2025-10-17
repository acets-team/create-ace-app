import { Nav } from '../Nav/Nav'
import { Layout } from '@ace/layout'
import { ServiceWorker } from '@ace/serviceWorker'

export default new Layout()
  .component(({children}) => {
    return <>
      <Nav />
      {children}
      <ServiceWorker />
    </>
  })
