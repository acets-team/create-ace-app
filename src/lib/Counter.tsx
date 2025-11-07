import { useStore } from '@src/store/store'


export function Counter() {
  const {set, store} = useStore()

  return <>
    <button class="brand" onClick={() => set('count', store.count + 1)} type="button">
      Count: {store.count}
    </button>
  </>
}
