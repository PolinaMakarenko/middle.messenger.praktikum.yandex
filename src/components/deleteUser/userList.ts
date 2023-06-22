import Block from "../../core/Block"
import template from "./userlist.hbs"

class UserList extends Block{
  render() {
    return this.compile(template, this.props)
  }
}

export default UserList
