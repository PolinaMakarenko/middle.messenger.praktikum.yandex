import Block from "../../core/Block"
import template from "./userListNew.hbs"

class UserList extends Block{
  render() {
    return this.compile(template, this.props)
  }
}

export default UserList
