import { object } from 'valibot'
import { vParse } from '@ace/vParse'
import { vString } from '@ace/vString'


export const apiSaveChatMessageParser = vParse(
  object({
    chatMessage: vString('Please add a message'),
  })
)
