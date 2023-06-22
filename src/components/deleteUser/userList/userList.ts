import Block from "../../../core/Block"
import template from "./userlist.hbs"

class UserList extends Block{
  render() {
    // console.log("ПРИШЛА")
    // console.log(this.props)

    return this.compile(template, { ...this.props })
  }
}

export default UserList
