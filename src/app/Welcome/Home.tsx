import { Route } from '@ace/route'
import { Title } from '@solidjs/meta'
import RootLayout from '../RootLayout'
import WelcomeLayout from './WelcomeLayout'


export default new Route('/')
  .layouts([RootLayout, WelcomeLayout])
  .component(() => {
    return <>
      <Title>🏡 Home</Title>

      <div class="title">Home 🏡</div>

      <ol>
        <li>Click count ➡️ Fine grained reactivity! 🥹</li>
        <li>Navigate page ➡️ The count remains! ✅</li>
        <li>Navigate page ➡️ Nav animation continues! 💫</li>
      </ol>
    </>
  })
