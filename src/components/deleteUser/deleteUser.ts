import Block from "../../core/Block"
import Buttons from "../button/button"
import ChatsController from "../../controlers/ChatController"
import { withStore } from "../../core/Store"
import template from "./deleteUser.hbs"
import UserList from "./userList/userList"
import UserListOne from "./userListOne/userListOne"

class DeleteUser extends Block {
  constructor(props: any) {
    super({ ...props})
  }
  init() {
      this.children.listUsers = this.createList(this.props)
      this.children.closeModalButton = new Buttons({
        label: "Close",
        events: {
          click: (e) => {
          e.stopPropagation()
          ChatsController.deleteUserModal(false)
      }}
    }) 
  }
  
 componentDidUpdate(_oldProps: any, newProps:any) {
    this.children.listUsers = this.createList(newProps)
    return true
  }
  
  private createList(props: any) {
    // console.log("пытаюсь обновиться")
    // console.log(props.users)
    return new UserList({
      users: props.users && props.users.map((item: any) => new UserListOne({
        text: item.login,
        userId: this.props.userId,
        events: {
          click: () => {
              if(item.id == this.props.userId ) {
        return ChatsController.deleteUserModal(false)
              }
          ChatsController.deleteUser(this.props.chatId, [item.id])
          }
        },
      }))
    })
    }
  
  render() {
    return this.compile(template, { ...this.props })
  }
}
  
  const withModal = withStore((state) => {
      return {
        deleteUserModal: state.deleteUserModal,
        ...state.modals.deleteUser,
        userId: state.user.data?.id,
        chatId: state.selectedId,
        users: state.chats.users
      }
  })
  
  export const ModalDeleteUser = withModal(DeleteUser)
