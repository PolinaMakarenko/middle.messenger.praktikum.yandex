import Block from "../../../core/Block"
import template from "./userListOne.hbs"

interface userProps {
  text: string
  userId: string
  events: {
    click: () => void
  }
}

class UserListOne extends Block<userProps> {
  constructor(props: any) {
    super({ ...props})
    // console.log("B Я пришла")
    // console.log(props)

  }
  

  
  render() {

    return this.compile(template,  { ...this.props })
  }
}

export default UserListOne
