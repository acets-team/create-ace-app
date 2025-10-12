import { API } from '@ace/api'
import { holdUp } from '@ace/holdUp'
import { fortunes } from '@src/lib/vars'
import { randomArrayItem } from '@ace/randomArrayItem'


export const GET = new API('/api/fortune', 'apiGetFortune')
  .resolve(async (scope) => {
    await holdUp()
    return scope.success(randomArrayItem(fortunes))
  })
