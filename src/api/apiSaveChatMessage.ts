import { API } from '@ace/api'
import { emojis } from '@src/lib/vars'
import type { ChatMessage } from '@src/lib/types'
import { randomArrayItem } from '@ace/randomArrayItem'
import { apiSaveChatMessageParser } from '@src/parsers/apiSaveChatMessageParser'


export const POST = new API('/api/save-chat-message', 'apiSaveChatMessage')
  .body(apiSaveChatMessageParser)
  .resolve(async (scope) => {
    const res: ChatMessage[] = [
      {
        userType: 'me',
        id: crypto.randomUUID(),
        message: scope.body.chatMessage,
      },
      {
        userType: 'friend',
        id: crypto.randomUUID(),
        message: randomArrayItem(emojis),
      }
    ]

    return scope.success(res)
  })
