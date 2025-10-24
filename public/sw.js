// @ts-check

import { addOfflineSupport } from '../.ace/addOfflineSupport.js'

const packageDotJsonVersion = '0.4.0'

addOfflineSupport({ cacheName: `offline-cache-v-${packageDotJsonVersion}` })
