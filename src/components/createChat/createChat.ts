import ChatController from "../../controlers/ChatController"
import Block from "../../core/Block"
import { withStore } from "../../core/Store"
import Buttons from "../button/button"
import FormNewChat from "../formNewChat/formNewChat"
import {chekValid}  from "../../core/Validation";
import template from "./createChat.hbs"

class CreateChat extends Block {
  init() {
    this.children.formChatInput = new FormNewChat({
      events: {
        submit: submitNewChat,
      }
    })
    this.children.closeButton = new Buttons({
        label: "Close",
        events: {
        click: (e) => {
          e.stopPropagation()
          ChatController.createChatModal(false)
        }
      }
    })  
  }
   
  render() {
    return this.compile(template, { ...this.props })
  }
  }
  
  const withModal = withStore((state) => {
      return { ...state }
  })
  
  export const ModalsCreateChat = withModal(CreateChat)


 const submitNewChat =  async (event: SubmitEvent): Promise<void> =>{
    event.preventDefault();
    const inputForm = (event.target as HTMLElement ).getElementsByTagName("input")
    const data = {title: ""};
    const error = document.querySelector(".error-message-title");
    if (chekValid( inputForm[0].name, inputForm[0].value )) {
        (error as HTMLElement).textContent = chekValid( inputForm[0].name, inputForm[0].value )
    } else {
        (error as HTMLElement).textContent = "";
        data["title"] = inputForm[0].value;
        await ChatController.createChat(data)
        await ChatController.getChats()
        ChatController.createChatModal(false)
    }
}
