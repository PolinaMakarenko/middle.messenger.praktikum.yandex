import Block from "../../core/Block"
import template from "./userItemNew.hbs"

interface MyProps {
  text: string
  userId: string
  events: {
    click: () => void
  }
}

class UserItem extends Block<MyProps> {
  render() {
    return this.compile(template, this.props)
  }
}

export default UserItem
