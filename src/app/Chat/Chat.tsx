import './Chat.css'
import { For } from 'solid-js'
import { Route } from '@ace/route'
import { Title } from '@solidjs/meta'
import { emojis } from '@src/lib/vars'
import { svg_up } from '@src/lib/svgs'
import { Refresh } from '@src/lib/Refresh'
import { useStore } from '@src/store/store'
import RootLayout from '@src/app/RootLayout'
import { refFormReset } from '@ace/refFormReset'
import { createOnSubmit } from '@ace/createOnSubmit'
import { showToast, showErrorToast } from '@ace/toast'
import { randomArrayItem } from '@ace/randomArrayItem'
import { SmoothFor, defaultSmoothForAnimateKeyframesChat } from '@ace/smoothFor'


export default new Route('/chat')
  .layouts([RootLayout])
  .component(() => {
    const {set, sync, store, refBind} = useStore()

    const smoothFor = new SmoothFor({ parent: '#chat-messages', children: '.message' })
    
    const onSubmit = createOnSubmit(({ event }) => {
      if (!store.chatMessage) return showErrorToast('Need an internet lesson?! 👩‍🏫')

      smoothFor.preSync()

      sync(
        'chatMessages',
        [
          ...store.chatMessages,
          {
            userType: 'me',
            id: crypto.randomUUID(),
            message: store.chatMessage,
          },
          {
            userType: 'friend',
            id: crypto.randomUUID(),
            message: randomArrayItem(emojis),
          },
        ]
      )

      smoothFor.postSync({scrollParentToBottom: true})

      event.currentTarget.reset()
    })


    const onResetClick = () => {
      set('chatMessages', [])
      showToast({type: 'success', value: 'Success!'})
    }


    return <>
      <Title>💬 Chat</Title>

      <main class="chat">
        <div class="head">💬 Chat</div>
        <div id="chat-messages">
          <For each={store.chatMessages}>{
            (m) => <div ref={ smoothFor.ref({animateKeyframes: defaultSmoothForAnimateKeyframesChat}) } class={`message ` + m.userType}>{m.message}</div>
          }</For>
        </div>

        <form onSubmit={onSubmit} ref={refFormReset()}>
          <Refresh onClick={onResetClick} tooltipContent="Refresh Chat" />
          <input ref={refBind('chatMessage')} type="text" placeholder="Type a message..." autocomplete="off" />
          <button type="submit">
            {svg_up()}
          </button>
        </form>
      </main>
    </>
  })
