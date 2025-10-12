import './app.css'
import '@ace/tabs.styles.css'
import '@ace/toast.styles.css'
import '@ace/shimmer.styles.css'
import '@ace/loading.styles.css'
import '@ace/tooltip.styles.css'
import { createApp } from '@ace/createApp'
import { StoreProvider } from '@src/store/store'


export default createApp([StoreProvider])
