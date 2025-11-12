import xml from '@ace/hljs/xml'
import hljs from '@ace/hljs/core'
import typescript from '@ace/hljs/typescript'

let registered = false

export function registerHljs() {
  if (!registered) { // it's important to have ts & xml for tsx, use typescript as the language for tsx ❤️
    hljs.registerLanguage('xml', xml)
    hljs.registerLanguage('typescript', typescript)

    registered = true
  }
}
