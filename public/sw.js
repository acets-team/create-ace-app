// @ts-check

import { addOfflineSupport } from '../.ace/addOfflineSupport.js'

const packageDotJsonVersion = '0.3.3'

addOfflineSupport({ cacheName: `offline-cache-v-${packageDotJsonVersion}` })
