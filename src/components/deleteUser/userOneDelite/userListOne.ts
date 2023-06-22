import Block from '../../../core/Block'
import template from './userItem.hbs'

interface userProps {
  text: string
  userId: string
  events: {
    click: () => void
  }
}

class UserListOne extends Block<userProps> {
  render() {
    return this.compile(template, this.props)
  }
}

export default UserListOne
