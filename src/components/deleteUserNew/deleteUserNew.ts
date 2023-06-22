import Block from "../../core/Block"
import Buttons from "../button/button"
import ChatsController from "../../controlers/ChatController"
import  { withStore } from "../../core/Store"
import template from "./deleteUserNew.hbs"
import UserList from "./userListNew"
import UserItem from "./userItemNew"


class DeleteUser extends Block {
    constructor(props: any) {
      super({ ...props})
    }
    init() {

        this.children.mainBlok = this.createList(this.props)

        this.children.closeModalButton = new Buttons({
        label: "Close",
        events: {
        click: (e) => {
            e.stopPropagation()
            ChatsController.deleteUserModal(false)
        }}
    }) 
    }

 componentDidUpdate(oldProps: any, newProps:any) {
      this.children.mainBlok = this.createList(newProps)
      return true
    }

    private createList(props: any) {
      return new UserList({
        users: props.users && props.users.map((item: any) => new UserItem({
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
        // ...state,
        deleteUserModal: state.deleteUserModal,
        ...state.deleteUser,
        userId: state.user.data?.id,
        chatId: state.selectedId,
        users: state.chats.users
      }
  })

  export const ModalDeleteUserNew = withModal(DeleteUser)
