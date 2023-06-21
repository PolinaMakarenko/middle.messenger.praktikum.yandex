import Block from "../../core/Block";
import template from "./chats3.hbs";
import "./chatsStyle3.scss";
import  { AllChatsStore } from "../../components/allChats/allChats";
import { OneChatSrore } from "../../components/chatOne/chatOne";
import { ModalsCreateChat } from "../../components/createChat/createChat";
import { withStore } from "../../core/Store";
import { ModalsAddUser } from "../../components/addUser/addUser";

type allChatsProp = {
  label: string;
  lastMess: string;
};

// const allChats = [
//         {label: "Ivan", lastMess: "Привет"},
//         {label: "vitek", lastMess: "Сообщение"},
//         {label: "Nik", lastMess: "Письмо"},
//         {label: "olga44", lastMess: "Новость"},
// ]

// interface AllPagesProps {
//     allChats: allChatsProp[];
// }

export default class ChatsTest extends Block {
  // constructor(props: any) {
  //   super(props);
  // }

  init() {
    this.children.allComChats = new AllChatsStore({});
    this.children.modalsCreate = new ModalsCreateChat({})
    this.children.modalnewUser = new ModalsAddUser({})
    

    this.children.oneComChat = new OneChatSrore({});
  }
  componentDidUpdate(oldProps?: any, newProps?: any) {
    this.children.modalnewUser = this.modalAgainnewUser(newProps);
    // this.children.allComChats = this.modalAgainnewUser(newProps);

    // (this.children.addUserModal as Block).setProps({newProps})
    
    return true
  }

  // modalAgainnewUser 
  private modalAgainnewUser(props: any) {
    // console.log("поптыка номер 55")
    // console.log(props.selectedId      )
    return new ModalsAddUser(props)
  }
  

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}


const withChat = withStore((state: any) => state)

export const ChatsTestStroe = withChat(ChatsTest)
