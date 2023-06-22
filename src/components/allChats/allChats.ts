import Input2 from "../../components/input2/input2";
import Link from "../../components/link/link";
import Block from "../../core/Block";
import template from "./allChats.hbs";
import ChatsController from "../../controlers/ChatController";
import timeFunc from "./timeHelper"
import ChatsList from "../chatsList/chatsList";
import { withStore } from "../../core/Store";
import Buttons from "../button/button";


export default class AllChats extends Block {
  // constructor(props?: any) {
  //   super(props);
  // }

  init() {
  this.children.inputSerch = new Input2({
      class: "all-chats__search",
      name: "search",
      type: "text",
      placeholder: "Search",
  });

  this.children.listallChats = [];

  this.getChats();

  // this.children.listallChats =  new ChatsList({
  //   title: "POLI",
  //   lable: "MM",
  // })

  this.children.buttonSerch = new Buttons({
    // class?: string;
    label: "Create Chat",
    events: {
      click: () => {
        // store.set(isAc)
        // console.log("HI pollim")
        ChatsController.createChatModal(true)
      }
    },
  })


  this.children.link = new Link({
        href: "/profile",
        class: "link-enter",
        label: "Go to Profil",
    });
  }

  public async getChats(): Promise<void> {
    // authController.getUser();
    ChatsController.getChats();
  }
  protected componentDidUpdate(_oldProps: any, newProps: any): boolean {
    // console.log("обновляйся падла")
    this.children.listallChats = this.listChatsSet(newProps)
    // ChatsController.getChats()
    return true
  }

  private listChatsSet(props: {chats: any}) {
    // console.log("mygh")
    // const mg = props.chats[0]
    // console.log("обновляйся падла")
    // console.log(props)
    // return new ChatsList({
    //   title: "POLI",
    //   lable: "MM",
    // })
    return props.chats.map((item: any) => new ChatsList({
      title: item.title,
      lable: item.title[0].toUpperCase(),
      // avatar: item.avatar,
      lastMess: item.last_message ? item.last_message.content : null,
      time: item.last_message ? timeFunc(item.last_message.time) : null,
      events: {
        click: () => {
          // console.log("HI")
          // console.log(item)
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
