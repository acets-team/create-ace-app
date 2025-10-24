// @ts-check

import { addOfflineSupport } from '../.ace/addOfflineSupport.js'

const packageDotJsonVersion = '0.4.2'

addOfflineSupport({ cacheName: `offline-cache-v-${packageDotJsonVersion}` })
