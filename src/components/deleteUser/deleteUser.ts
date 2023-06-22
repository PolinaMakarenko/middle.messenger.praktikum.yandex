import Block from "../../core/Block"
import Buttons from "../button/button"
import ChatsController from "../../controlers/ChatController"
import store, { withStore } from "../../core/Store"
import template from "./deleteUser.hbs"
import UserList from "./userList"
import UserItem from "./useritem"

class DeleteUser extends Block {
    constructor(props: any) {
      super({ ...props})
    //   console.log("GGGGGG")
    //   console.log(props)
    }
    init() {
  
  
      this.children.centerElement = this.createList(this.props)
  
    //   this.children.mainButton = new SendBtn({
    //     events: {
    //       click: async () => {
    //         if (!this.props.selectedUserId) return
  
    //         store.set('modals.deleteUser.isLoading', true)
  
    //         await ChatsController.deleteUser(this.props.chatId, [this.props.selectedUserId])
  
    //         store.set('chats.users', null)
    //         store.set('modals.deleteUser.isLoading', false)
    //         ModalsController.deleteUserToggler(false)
    //       }
    //     }
    //   })
    this.children.closeButton = new Buttons({
        label: "Close",
        events: {
        click: (e) => {
            e.stopPropagation()
            // console.log(this.props.users)
        // store.set('chats.users', null)
        // this.props.users = undefined
        // console.log(store)
        ChatsController.deleteUserModal(false)

        }}
    }) 


    }
  
 componentDidUpdate(oldProps: any, newProps:any) {
//         // console.log(this.props.users.length)
//       if ( this.props.deleteUserModal && !this.props.users) {
//         ChatsController.getUsers(this.props.chatId).then((data) => {
//           store.set('chats.users', data)
//           console.log(this.props.users)
//           console.log(data)
//         })
//       }
    
      this.children.centerElement = this.createList(newProps)
      return true
    }
  
    private createList(props: any) {
        // console.log("NYRN")
        // console.log(props)
        
      return new UserList({
        users: props.users && props.users.map((item: any) => new UserItem({
          text: item.login,
          userId: this.props.userId,
          events: {
            click: () => {

                if(item.id == this.props.userId ) {
          return ChatsController.deleteUserModal(false)
                }
            //   ChatsController.deleteUserSelect(item.id)
            ChatsController.deleteUser(this.props.chatId, [item.id])
            // console.log("TYYYT")
            }
          },
        //   selected: item.id === this.props.selectedUserId
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
        ...state.modals.deleteUser,
        userId: state.user.data?.id,
        chatId: state.selectedId,
        users: state.chats.users
      }
  })
  
  export const ModalDeleteUser = withModal(DeleteUser)
