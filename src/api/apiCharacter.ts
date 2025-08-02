import { API } from '@ace/api'
import { holdUp } from '@ace/holdUp'
import { vParse } from '@ace/vParse'
import { object, picklist } from 'valibot'
import { randomBetween } from '@ace/randomBetween'
import { characters, elements } from '@src/lib/vars'


export const GET = new API('/api/character/:element', 'apiCharacter')
  .pathParams(vParse(object({ element: picklist(elements) })))
  .resolve(async (scope) => {
    await holdUp()

    const maxIndex = characters[scope.pathParams.element].length - 1
    const randomIndex = randomBetween(0, maxIndex)
    const character = characters[scope.pathParams.element][randomIndex]

    return scope.success(character)
  })
