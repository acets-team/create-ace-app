'use server'

import { API } from '@ace/api'
import { holdUp } from '@ace/holdUp'
import type { InferEnums } from '@ace/paramEnums'
import { randomBetween } from '@ace/randomBetween'
import { characters, elementEnums } from '@src/lib/vars'


export const GET = new API('/api/character/:element', 'apiCharacter')
  .params<{ element: InferEnums<typeof elementEnums> }>()
  .resolve(async (be) => {
    const params = be.getParams()

    if (!elementEnums.has(params.element)) throw new Error(`❌ Please send a valid element, "${params.element}" is not a valid element, the valid elements are: ${elementEnums}`)

    await holdUp()

    const character = characters[params.element][randomBetween(0, characters[params.element].length - 1)]

    return be.json({ character })
  })
