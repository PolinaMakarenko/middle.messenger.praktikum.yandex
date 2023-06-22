import ChatsController from "../../controlers/ChatController"
import Block from "../../core/Block"
import { withStore } from "../../core/Store"
import Buttons from "../button/button"
import template from "./addUser.hbs"
import Input2 from "../input2/input2"
import UserController from "../../controlers/UserController"
import ErrorLable from "../errorLable/errorLable"

// interface modalProps {
//   selectedId: number

// }

class AddUser extends Block {
  constructor(props:any) {
    super({...props}) 
    // console.log("chec props")
    // console.log(props)
  }

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
            text: ''
          })
    }
    componentDidUpdate(oldProps: any, newProps: any) {
      // console.log("hhii")
      // console.log({...this.props})

        this.children.errorFind = this.newError({...this.props})
        return true
    }

    private newError(props: any) {
        // console.log("JIB<RFRFL")
        // console.log(props.addChatUser.error)
        return new ErrorLable({
            // console.log()
          text: props.addChatUser.error || ''
        })
      }
   
  
    render() {
      return this.compile(template, { ...this.props })
    }
}
  
const withModal = withStore((state) => {
      return { ...state, chatId: state.selectedId }
})
  
export const ModalsAddUser = withModal(AddUser)

  // console.log(ModalsCreateChat)



const  clickAddUser = async(event: Event)=>{
    event.stopPropagation()
    const target = event.currentTarget as HTMLButtonElement

    const input = target.closest(".modals")?.querySelector(".input_serch") as HTMLInputElement
    console.log(input.value)
    const data = {login: input.value}
    
    

    const user = await UserController.searchUser(data)
    console.log(user)
    if (user.length === 0) {
        return ChatsController.addUserSerError('Пользователь не найден')
      }
    // const data = {login: ""}
    // const gggflgfl = this.props.myFFF ? this.props.myFFF  : 3
    ChatsController.addUserSerError('')
    await ChatsController.addUser([user[0].id])
    ChatsController.addUserModal(false)
    
    // eslint-disable-next-line no-console
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    // console.log(this.props.user!)

}

// const submitNewChat =  async (event: SubmitEvent): Promise<void> =>{
//     event.preventDefault();
//     const inputForm = (event.target as HTMLElement ).getElementsByTagName("input")
//     const data = {title: ""};
//     const error = document.querySelector(".error-message-title");
//     // error.textContent = "fkv"
//     // console.log(error)
//     if (chekValid( inputForm[0].name, inputForm[0].value )) {
//         (error as HTMLElement).textContent = chekValid( inputForm[0].name, inputForm[0].value )
//     } else {
//         (error as HTMLElement).textContent = "";
//         data["title"] = inputForm[0].value;
//         // console.log(data); 
//         await ChatController.createChat(data)
//         await ChatController.getChats()
//         ChatController.createChatModal(false)
//         // (event as HTMLFormElement ).reset()
//     }
// }
