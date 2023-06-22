import Block from "../../core/Block";
import template from "./chatsList.hbs"

interface IButtonProps {
    // activeClass: string
    // avatar: string
    lable?: string
    title?: string
    time?: string | null
    userSendlas?: string
    // total?: TotalMessProps
    lastMess?: string
    events?: {
      click: () => void
    }
  }
  
export default class ChatsList extends Block {
    constructor(props?: IButtonProps) {
      super({
        ...props
        })
        // console.log("i am render")
      // console.log(props)
    }
  
    render() {
      return this.compile(template, {...this.props})
    }
}



