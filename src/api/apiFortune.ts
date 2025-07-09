import { API } from '@ace/api'
import { object } from 'valibot'
import { holdUp } from '@ace/holdUp'
import { fortunes } from '@src/lib/vars'
import { valibotParams } from '@ace/valibotParams'
import { valibotString2Number } from '@ace/valibotString2Number'


export const GET = new API('/api/fortune/:id', 'apiFortune')
  .pathParams(valibotParams(object({ id: valibotString2Number() })))
  .resolve(async (be) => {
    await holdUp()
    return be.success({ id: be.pathParams.id, fortune: fortunes[be.pathParams.id] })
  })
