import { API } from '@ace/api'
import { holdUp } from '@ace/holdUp'
import type { InferEnums } from '@ace/enums'
import { randomBetween } from '@ace/randomBetween'
import { characters, elementEnums } from '@src/lib/vars'


export const GET = new API('/api/character/:element', 'apiCharacter')
  .params<{ element: InferEnums<typeof elementEnums> }>()
  .resolve(async (be) => {
    const {element} = be.getParams()

    if (!elementEnums.has(element)) throw new Error(`❌ Please send a valid element, "${element}" is not a valid element, the valid elements are: ${elementEnums}`)

    await holdUp()

    const character = characters[element][randomBetween(0, characters[element].length - 1)]

    return be.success(character)
  })
