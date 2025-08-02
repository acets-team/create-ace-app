import { API } from '@ace/api'
import { object } from 'valibot'
import { vNum } from '@ace/vNum'
import { holdUp } from '@ace/holdUp'
import { vParse } from '@ace/vParse'
import { fortunes } from '@src/lib/vars'


export const GET = new API('/api/fortune/:id', 'apiFortune')
  .pathParams(vParse(object({ id: vNum() })))
  .resolve(async (scope) => {
    await holdUp()
    return scope.success({ id: scope.pathParams.id, fortune: fortunes[scope.pathParams.id] })
  })
