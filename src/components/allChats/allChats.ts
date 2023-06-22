import Input2 from "../../components/input2/input2";
import Link from "../../components/link/link";
import Block from "../../core/Block";
import template from "./allChats.hbs";
import ChatsController from "../../controlers/ChatController";
import timeFunc from "./timeHelper"
import ChatsList from "../chatsList/chatsList";
import { withStore } from "../../core/Store";
import Buttons from "../button/button";
import  Router  from "../../core/Rourer";
import AuthController from "../../controlers/AuthController";


export default class AllChats extends Block {

  init() {
  this.children.inputSerch = new Input2({
      class: "all-chats__search",
      name: "search",
      type: "text",
      placeholder: "Search",
  });

  this.children.listallChats = [];

  this.getChats();


  this.children.buttonLogout = new Buttons({
      // class: "login-form__submit",
      label: "LOGOUT",
      events: {
        click: (event) => {
          event.preventDefault()
          AuthController.logout()
        }
      }
  });

  this.children.buttonCreate = new Buttons({
    // class?: string;
    label: "Create Chat",
    events: {
      click: () => {
        ChatsController.createChatModal(true)
      }
    },
  })


  this.children.link = new Link({
        href: "/profile",
        class: "link-enter",
        label: "Go to Profil",
        events: { click:  ()=> Router.go("/profile")}
    });
  }

  public async getChats(): Promise<void> {
    ChatsController.getChats();
  }
  protected componentDidUpdate(_oldProps: any, newProps: any): boolean {
    this.children.listallChats = this.listChatsSet(newProps)
    return true
  }

  private listChatsSet(props: {chats: any}) {

    return props.chats.map((item: any) => new ChatsList({
      title: item.title,
      lable: item.title[0].toUpperCase(),
      lastMess: item.last_message ? item.last_message.content : null,
      userSendlas: item.last_message ? item.last_message.user.first_name : null,
      time: item.last_message ? timeFunc(item.last_message.time) : null,
      events: {
        click: () => {
          ChatsController.selectChat(item.id)
        }
      },
    }))
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

const withChat = withStore((state) => ({ ...state.user.data ,chats: [...(state.chats.list.data || [])] }))

export const AllChatsStore = withChat(AllChats)
