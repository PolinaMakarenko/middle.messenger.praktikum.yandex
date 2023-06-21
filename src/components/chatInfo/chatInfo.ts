import Block from "../../core/Block";
import Buttons from "../button/button";
import template from "./chatInfo.hbs";
import ChatsController from "../../controlers/ChatController"
import { ModalsAddUser } from "../addUser/addUser";
// import { ModalsAddUser } from "../addUser/addUser";


export default class ChatInfo extends Block {
    constructor(props?: any) {
        super({
          ...props
          })
          // console.log("i am render 223")
        // console.log(props)
    }
     init(){
        // this.children.addnewUserModal = new ModalsAddUser(this.props.chatId)
        this.children.buttonDelite = new Buttons({
            // class?: string;
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
            // class?: string;
            label: "+ User",
            events: {
              click: () => {
                // store.set(isAc)
                // console.log("HI pollim +user")
                ChatsController.addUserModal(true)
              }
            },
        })

        this.children.buttonDeliteUser = new Buttons({
            // class?: string;
            label: "- User",
            events: {
              click: () => {
                // store.set(isAc)
                console.log("HI pollim delite")
                // ChatsController.createChatModal(true)
              }
            },
        })
    }




    render() {
        return this.compile(template, { ...this.props })
    }
}

