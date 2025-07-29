import { API } from '@ace/api'
import { holdUp } from '@ace/holdUp'
import { vParser } from '@ace/vParser'
import { object, picklist } from 'valibot'
import { randomBetween } from '@ace/randomBetween'
import { characters, elements } from '@src/lib/vars'


export const GET = new API('/api/character/:element', 'apiCharacter')
  .pathParams(vParser(object({ element: picklist(elements) })))
  .resolve(async (be) => {
    await holdUp()

    const maxIndex = characters[be.pathParams.element].length - 1
    const randomIndex = randomBetween(0, maxIndex)
    const character = characters[be.pathParams.element][randomIndex]

    return be.success(character)
  })
