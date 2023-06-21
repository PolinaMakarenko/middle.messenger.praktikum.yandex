import { Message } from "../../controlers/MessagerController"
import Block from "../../core/Block"
import { withStore } from "../../core/Store"
import template from "./chatMessage.hbs"
import getTime from "../allChats/timeHelper"
import oneMessage from "../oneMessage/oneMessage"

type InterfacePropsWithStore = { messages: Message[], userId: number, selectedChatId: number }

class ChatMessage extends Block {
  init() {
    this.children.messages = this.oneMessages(this.props)
  }

  componentDidUpdate(oldProps: any, newProps: any) {
    this.children.messages = this.oneMessages(newProps)
    return true
  }

  private oneMessages(props: InterfacePropsWithStore) {
    return props.messages.map((item) => new oneMessage({
      text: item.content,
      time: getTime(item.time),
      class: item.user_id === props.userId ? "chat_message_list_user" : "chat_message_list_addresser"
    }))
  }

  render() {
    return this.compile(template, this.props)
  }
}

const withChat = withStore((state) => {
  const selectedChatId = state.selectedId

  if (!selectedChatId) {
    return {
      messages: [],
      selectedChatId: undefined,
      userId: state.user.data?.id
    }
  }

  return {
    messages: (state.messages || {})[selectedChatId] || [],
    selectedChatId,
    userId: state.user.data?.id
  }
})

export const ChatMessagesSrore = withChat(ChatMessage)
