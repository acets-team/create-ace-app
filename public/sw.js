// @ts-check

import { addOfflineSupport } from '../.ace/addOfflineSupport.js'

const packageDotJsonVersion = '0.4.1'

addOfflineSupport({ cacheName: `offline-cache-v-${packageDotJsonVersion}` })
