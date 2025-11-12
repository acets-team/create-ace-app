import './Chat.css'
import { For } from 'solid-js'
import { Route } from '@ace/route'
import { kParse } from '@ace/kParse'
import { showToast } from '@ace/toast'
import { buildOrigin } from '@ace/env'
import { svg_up } from '@src/lib/svgs'
import { Messages } from '@ace/messages'
import { Refresh } from '@src/lib/Refresh'
import { useStore } from '@src/store/store'
import { Title, Meta } from '@solidjs/meta'
import RootLayout from '@src/app/RootLayout'
import { apiSaveChatMessage } from '@ace/apis'
import { refFormReset } from '@ace/refFormReset'
import { createOnSubmit } from '@ace/createOnSubmit'
import { apiSaveChatMessageParser } from '@src/parsers/apiSaveChatMessageParser'
import { SmoothFor, defaultSmoothForAnimateKeyframesChat } from '@ace/smoothFor'


export default new Route('/chat')
  .layouts([RootLayout])
  .component((scope) => {
    const {set, sync, store, refBind} = useStore()

    const smoothFor = new SmoothFor({ parent: '#chat-messages', children: '.message' })
    
    const onSubmit = createOnSubmit(({ event }) => {
      const body = kParse(apiSaveChatMessageParser, { chatMessage: store.chatMessage })

      apiSaveChatMessage({
        body,
        onSuccess(d) {
          event.currentTarget.reset() // reset form
          smoothFor.preSync()
          sync('chatMessages', [...store.chatMessages, ...d])
          smoothFor.postSync({ scrollParent: 'bottom' })
        }
      })
    })


    const onRefreshClick = () => {
      set('chatMessage', '') // clear input
      set('chatMessages', []) // clear chat messages
      scope.messages.set({ name: 'chatMessage', value: [] }) // clear error messages
      showToast({ type: 'success', value: '❤️ Clear!' })
    }


    return <>
      <Title>💬 Chat · Create Ace App</Title>
      <Meta property="og:title" content="💬 Chat · Create Ace App" />
      <Meta property="og:type" content="website" />
      <Meta property="og:url" content={buildOrigin + '/chat'} />
      <Meta property="og:image" content={buildOrigin + '/og/chat.webp'} />

      <main class="chat">
        <div class="head">💬 Chat</div>
        <div id="chat-messages">
          <For each={store.chatMessages}>{
            (m) => <div ref={ smoothFor.ref({animateKeyframes: defaultSmoothForAnimateKeyframesChat}) } class={`message ` + m.userType}>{m.message}</div>
          }</For>
        </div>

        <form onSubmit={onSubmit} ref={refFormReset()}>
          <div class="top">
            <Refresh onClick={onRefreshClick} tooltipContent="Refresh Chat" />
            <input ref={refBind('chatMessage')} name="chatMessage" type="text" placeholder="Type a message..." autocomplete="off" />
            <button type="submit" aria-label="Send chat message">{svg_up()}</button>
          </div>
          <Messages name="chatMessage" />
        </form>
      </main>
    </>
  })
