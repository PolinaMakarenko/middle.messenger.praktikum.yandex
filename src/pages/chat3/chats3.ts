import Block from "../../core/Block";
import template from "./chats3.hbs";
import "./chatsStyle3.scss";
import  { AllChatsStore } from "../../components/allChats/allChats";
import { OneChatSrore } from "../../components/chatOne/chatOne";
import { ModalsCreateChat } from "../../components/createChat/createChat";
import { withStore } from "../../core/Store";
import { ModalsAddUser } from "../../components/addUser/addUser";
import { ModalDeleteUserNew } from "../../components/deleteUserNew/deleteUserNew";


export default class ChatsTest extends Block {

  init() {
    this.children.allComChats = new AllChatsStore({});
    this.children.modalsCreate = new ModalsCreateChat({})
    this.children.modalnewUser = new ModalsAddUser({})
    this.children.modalDeleteUser = new ModalDeleteUserNew({})
    this.children.oneComChat = new OneChatSrore({});
  }
  
  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}


const withChat = withStore((state: any) => state)

export const ChatsTestStroe = withChat(ChatsTest)
