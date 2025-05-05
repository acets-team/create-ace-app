import { Title } from '@solidjs/meta'
import { HttpStatusCode } from '@solidjs/start'


export default () => {
  return <>
    <Title>Not Found</Title>

    <main>
      <HttpStatusCode code={404} />
      <h1>Page Not Found</h1>
    </main>
  </>
}
