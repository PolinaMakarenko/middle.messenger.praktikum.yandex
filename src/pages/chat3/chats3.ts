import Block from "../../core/Block";
import template from "./chats3.hbs";
import "./chatsStyle3.scss";
import  { AllChatsStore } from "../../components/allChats/allChats";
import { OneChatSrore } from "../../components/chatOne/chatOne";
import { ModalsCreateChat } from "../../components/createChat/createChat";
import { withStore } from "../../core/Store";
import { ModalsAddUser } from "../../components/addUser/addUser";
import { ModalDeleteUser } from "../../components/deleteUser/deleteUser";

type allChatsProp = {
  label: string;
  lastMess: string;
};


export default class ChatsTest extends Block {
  // constructor(props: any) {
  //   super(props);
  // }

  init() {
    this.children.allComChats = new AllChatsStore({});
    this.children.modalsCreate = new ModalsCreateChat({})
    this.children.modalnewUser = new ModalsAddUser({})
    this.children.modalDeleteUser = new ModalDeleteUser({})
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
