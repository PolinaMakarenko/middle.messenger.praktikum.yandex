import FormMess from "../../components/formMess/formMess";
import Link from "../../components/link/link";
import Block from "../../core/Block";
// import { submitMess } from "../../core/Validation";
import template from "./chatOne.hbs";
import { withStore } from "../../core/Store";
import ChatInfo from "../chatInfo/chatInfo";
// import { ModalsAddUser } from "../addUser/addUser";
import MessagesController from "../../controlers/MessagerController"
import { chekValid } from "../../core/Validation";
import { ChatMessagesSrore } from "../chatMessage/chatMessage";
import ChatController from "../../controlers/ChatController";




export default class ChatsOne extends Block {
  constructor(props?: any) {
    super(props);
    console.log("My test")
    console.log(props)
  }

  init() {
    // let myBloc = document.getElementById("chat_message")
    // console.log(myBloc)
    this.children.chatMessageBlock = new ChatMessagesSrore({})
    this.children.chatInfoBlock = this.updateChatInfo(this.props)
    this.children.newMess = new FormMess({
      events: {
        // submit: (event)=> { event.preventDefault() 
        //   console.log(event.target.value)},
        submit: async(event: SubmitEvent) =>{
          event.preventDefault();
          const inputForm = (event.target as HTMLElement ).getElementsByTagName("input")
          // const data: Record<string, string> = {};
          const error = document.querySelector(".error-message");
          if (chekValid( inputForm[0].name, inputForm[0].value )) {
              (error as HTMLElement).textContent = chekValid( inputForm[0].name, inputForm[0].value )
          } else {
              (error as HTMLElement).textContent = "";
              // data[inputForm[0].name] = inputForm[0].value;
              // console.log(inputForm[0].value); 
              MessagesController.sendMessage(this.props.selectedId, inputForm[0].value);
              await ChatController.getChats();
              (event.target as HTMLFormElement ).reset()
          }
      }
      },
    });
  
    this.children.link = new Link({
        href: "/profile",
        class: "link-enter",
        label: "Go to Profil",
    });
  }

  componentDidUpdate(oldProps?: any, newProps?: any) {
    this.children.chatInfoBlock = this.updateChatInfo(newProps);
    // (this.children.addUserModal as Block).setProps({newProps})
    
    return true
  }
  

  // private updateModalInfo(props: any) {
  //   // return new ModalsAddUser({chatId: props.selectedId})
  // }

  private updateChatInfo(props: any) {
    // console.log('Я работаю')
    // console.log(props)
    // this.children.addUserModal = new ModalsAddUser({})
    return new ChatInfo({
      // imageUrl: props.selectedId
      //   ? props.list.data.find(item => item.id === props.selectedId)?.avatar
      //   : null,
      name: props.selectedId
        ? props.list.data.find(item => item.id === props.selectedId)?.title
        : null,
      chatId: props.selectedId,
      // settings: {
      //   events: {
      //     click: () => {
      //       ModalsController.editChatsToggler(!this.props.show)
      //     }
      //   }
      // }
    })
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

const withChat = withStore((state) => ({ ...state, ...state.chats}))

export const OneChatSrore = withChat(ChatsOne)
