import Block from "../../core/Block";
import Buttons from "../button/button";
import template from "./chatInfo.hbs";
import ChatsController from "../../controlers/ChatController"
import store from "../../core/Store";


export default class ChatInfo extends Block {
  constructor(props: any) {
    super({...props})
  }
  init(){
    this.children.buttonDelite = new Buttons({
      label: "Delete chat",
      events: {
        click: async() => {
          
          await ChatsController.deleteChat(this.props.chatId)
          await ChatsController.getChats()
          ChatsController.selectChat(undefined)
        }
      },
    })
        
    this.children.buttonAddUser = new Buttons({
      label: "+ User",
      events: {
        click: () => {        
          ChatsController.addUserModal(true)
        }
      },
    })

    this.children.buttonDeliteUser = new Buttons({
      label: "- User",
      events: {
        click: () => {
          store.set("selectedId", this.props.chatId)
          ChatsController.getUsers(this.props.chatId).then((data) => {
            store.set("chats.users", data)
          })
          ChatsController.deleteUserModal(true)
        }
      },
    })
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}

