import { createContext } from 'solid-js'
import type { atoms } from '@src/store/atoms'
import type { BaseStoreContext } from '@ace/types'


export const StoreContext = createContext<BaseStoreContext<typeof atoms>>()
