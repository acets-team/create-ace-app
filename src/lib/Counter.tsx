import { createSignal } from 'solid-js'


export default function Counter() {
  const [count, setCount] = createSignal(0)

  return <>
    <button class="counter brand" onClick={() => setCount(count() + 1)} type="button">
      Count: {count()}
    </button>
  </>
}
