import './Welcome.css'
import { Layout } from '@ace/layout'


export default new Layout()
  .component((fe) => {
    return <>
      <div class="welcome-layout">
        <div class="welcome-emoji">✨</div>
        {fe.getChildren()}
      </div>
    </>
  })
