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
        <li>When count is clicked, it is the only element that renders again! 🥹</li>
        <li>& count's state is maintained between pages thanks to layouts! ✅</li>
        <li>Layouts, Contexts & Stores are all lovely options to achieve this! ❤️</li>
      </ol>
    </>
  })
