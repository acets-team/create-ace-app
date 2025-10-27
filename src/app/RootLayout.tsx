import { Nav } from '../Nav/Nav'
import { Layout } from '@ace/layout'

export default new Layout()
  .component(({children}) => {
    return <>
      <Nav />
      {children}
    </>
  })
