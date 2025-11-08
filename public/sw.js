// @ts-check

import { swAddOffLineSupport } from './.ace/swAddOffLineSupport.js'

const packageDotJsonVersion = '0.8.0'

swAddOffLineSupport({
  installUrls: ['/', '/chat', '/fortunes'],
  cacheName: `offline-cache-v-${packageDotJsonVersion}`,
})
