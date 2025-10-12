import { atoms } from './atoms'
import { createStore } from '@ace/createStore'


export const { useStore, StoreProvider } = createStore({ atoms })
