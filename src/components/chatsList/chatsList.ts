import Block from "../../core/Block";
import template from "./chatsList.hbs"

interface IButtonProps {
    lable?: string
    title?: string
    time?: string | null
    userSendlas?: string
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
    }
  
    render() {
      return this.compile(template, {...this.props})
    }
}



