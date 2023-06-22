import ChatsController from "../../controlers/ChatController"
import Block from "../../core/Block"
import { withStore } from "../../core/Store"
import Buttons from "../button/button"
import template from "./addUser.hbs"
import Input2 from "../input2/input2"
import UserController from "../../controlers/UserController"
import ErrorLable from "../errorLable/errorLable"



class AddUser extends Block {

    init() {

        this.children.inputUserName = new Input2({
            class: "input_serch",
            type: "text",
            name: "title",
            placeholder: "User name"
        })

        this.children.srechButton  = new Buttons({
            label: "Find",
            events: {
                click: clickAddUser,
            }
        })

        this.children.closeButton = new Buttons({
            label: "Close",
            events: {
            click: (e) => {
                e.stopPropagation()
                ChatsController.addUserModal(false)
            }}
        }) 
        
        this.children.errorFind = new ErrorLable({
            text: ""
          })
    }
    componentDidUpdate(_oldProps: any, newProps: any) {
        this.children.errorFind = this.newError(newProps)
        return true
    }

    private newError(props: any) {
        return new ErrorLable({
          text: props.eror || ""
        })
      }
   
  
    render() {
      return this.compile(template, { ...this.props })
    }
}
  
const withModal = withStore((state) => {
      return {...state, chatId: state.selectedId, eror: state.addChatUser.error }
})
  
export const ModalsAddUser = withModal(AddUser)



const  clickAddUser = async(event: Event)=>{
    event.stopPropagation()
    const target = event.currentTarget as HTMLButtonElement

    const input = target.closest(".modals")?.querySelector(".input_serch") as HTMLInputElement
    // console.log(input.value)
    const data = {login: input.value}
    
    

    const user = await UserController.searchUser(data)
    console.log(user)
    if (user.length === 0) {
        return ChatsController.addUserSerError("User not found")
      }

    ChatsController.addUserSerError("")
    await ChatsController.addUser([user[0].id])
    ChatsController.addUserModal(false)


}

