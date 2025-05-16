import { API } from '@ace/api'
import { fortunes } from '@src/lib/vars'
import { holdUp } from '@ace/holdUp'
import { parseNumber } from '@ace/parseNumber'


export const GET = new API('/api/fortune/:id', 'apiFortune')
  .params<{ id: number }>()
  .resolve(async (be) => {
    const params = be.getParams()

    const maxId = fortunes.length - 1

    const id = parseNumber({ potential: params.id, min: 0, max: maxId, error: `❌ Please send a valid id, "${params.id}" is not a number between 0 and ${maxId}` })

    await holdUp()

    return be.json({ fortune: fortunes[id] })
  })
