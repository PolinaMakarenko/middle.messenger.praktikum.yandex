import Block from '../../core/Block'
import template from './userItem.hbs'

interface IUserItemProps {
  text: string
  userId: string
  events: {
    click: () => void
  }
  selected?: boolean
}

class UserItem extends Block<IUserItemProps> {
  render() {
    return this.compile(template, this.props)
  }
}

export default UserItem
