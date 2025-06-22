import { Route } from '@ace/route'
import { Title } from '@solidjs/meta'
import RootLayout from '@src/app/RootLayout'


export default new Route('/')
  .layouts([RootLayout])
  .component(() => {
    return <>
      <Title>🏡 Home</Title>

      <main class="home">
        <div class="emoji">🌟</div>
        <div class="page-title">Home 🏡</div>

        <ol>
          <li>Click count ➡️ Fine grained reactivity! 🥹</li>
          <li>Navigate page ➡️ The count remains! ✅</li>
          <li>Navigate page ➡️ Nav animation continues! 💫</li>
        </ol>
      </main>
    </>
  })
