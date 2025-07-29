import { API } from '@ace/api'
import { object } from 'valibot'
import { vNum } from '@ace/vNum'
import { holdUp } from '@ace/holdUp'
import { fortunes } from '@src/lib/vars'
import { vParser } from '@ace/vParser'


export const GET = new API('/api/fortune/:id', 'apiFortune')
  .pathParams(vParser(object({ id: vNum() })))
  .resolve(async (be) => {
    await holdUp()
    return be.success({ id: be.pathParams.id, fortune: fortunes[be.pathParams.id] })
  })
